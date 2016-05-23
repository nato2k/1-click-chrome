var pollInterval = 1000 * 60 * 10;  // 10 minute
var retryPollInterval = 1000 / 2; // 1/2 second
var tryPollInterval = 1000 * 15; // 15 seconds
var requestFailureCount = 0;
var retryCount = 0;
var requestTimeout = 1000 * 5;  // 5 seconds
var badgeTemperature = "";
var loadingAnimation = new LoadingAnimation();

// A "loading" animation displayed while we wait for the first response from
// Gmail. This animates the badge text with a dot that cycles from left to
// right.
function LoadingAnimation() {
  this.timerId_ = 0;
  this.maxCount_ = 8;  // Total number of states in animation
  this.current_ = 0;  // Current state
  this.maxDot_ = 4;  // Max number of dots in animation
}

LoadingAnimation.prototype.paintFrame = function() {
  var text = "";
  for (var i = 0; i < this.maxDot_; i++) {
    text += (i == this.current_) ? "." : " ";
  }
  if (this.current_ >= this.maxDot_)
    text += "";

  chrome.browserAction.setBadgeText({text:text});
  this.current_++;
  if (this.current_ == this.maxCount_)
    this.current_ = 0;
}

LoadingAnimation.prototype.start = function() {
  if (this.timerId_)
    return;

  var self = this;
  this.timerId_ = window.setInterval(function() {
    self.paintFrame();
  }, 100);
}

LoadingAnimation.prototype.stop = function() {
  if (!this.timerId_)
    return;

  window.clearInterval(this.timerId_);
  this.timerId_ = 0;
}

function init() {
  chrome.browserAction.setBadgeBackgroundColor({color:[0, 51, 153, 255]});
  
  if (isFirstTime()) {
	  chrome.browserAction.setBadgeText({text:"?"});
  	chrome.tabs.create({url: "options.html"});
  }
  else 
  {
	  chrome.browserAction.setBadgeText({text:"..."});
	  loadingAnimation.start();
  }
  
  window.setTimeout(startRequest, 500);
}

function scheduleRequest() {
  delay = Math.round(pollInterval);
  if (requestFailureCount > 0) 
  	delay = tryPollInterval;

  window.setTimeout(startRequest, delay);
}

// ajax stuff
function startRequest(responseFunction, errorFunction) {
  console.log("updating info...");
  weatherData.updateInfo(
  	function() {
		  retryCount = 0;
      loadingAnimation.stop();
      updateTemperature();
      scheduleRequest();
      if (responseFunction)
	      responseFunction();
  	},
  	function() {
  		++retryCount;
  		
  		if (retryCount <= 2) {
			  window.setTimeout(startRequest,retryPollInterval);
			}
			else 
			{
			  retryCount = 0;
      	if (errorFunction)
	      	errorFunction();
	      
	      loadingAnimation.stop();
	      
	      // Could not update, force data as not loaded.
	      weatherData.loaded = false;
      	chrome.browserAction.setBadgeText({ text : "X" });
	      chrome.browserAction.setTitle({title: tr("connectionDownTitle")});
	    	
	      scheduleRequest();
	  	}
    });
}

function updateFromConfiguration() {
	loadingAnimation.start();
	
  weatherData.updateInfo(
	function() {
    loadingAnimation.stop();
    updateTemperature();
	},
	function() {
    loadingAnimation.stop();
  });
}

function updateTemperature() {
    if (weatherData.hasCurrentCondition)
	    badgeTemperature = weatherData.temperatureClear;
	  else
	  	badgeTemperature = tr("nonAvailable");
	  	
    chrome.browserAction.setIcon({path:"images/20x20/" + weatherData.icon});
    chrome.browserAction.setTitle({title: weatherData.cityName});
	  
	  chrome.browserAction.setBadgeText({
  	    text: badgeTemperature != "" ? badgeTemperature : "?"
    	});
    
    if (weatherData.hasSevereAlerts()) 
	    chrome.browserAction.setBadgeBackgroundColor({color:[214, 1, 2, 255]});
	  else 
	    chrome.browserAction.setBadgeBackgroundColor({color:[0, 51, 153, 255]});

    chrome.browserAction.setTitle({title: weatherData.cityName});
}
function loadHandler() {
	setTimeout(init, 1000);
}
document.addEventListener('DOMContentLoaded', function () {
	//var elem = document.getElementById("full");
  window.addEventListener('load', loadHandler);
});