// Saves options to localStorage.
function save_options() {
	if (trim($("#location").val()) == "" || isToggleText()) {
		alert(tr("options_empty_city", $('#language input:checked').val()));
		return;
	}
	
	// If the user entered the zipcode directly, the locId will be containing only the zipcode.
	// We should always have at this point, only one result returned from the search xml, otherwise its not valid.
	// First obtain the dnam from the search and then search again without the parentesis and the zipcode
	// If the location found is eight characters, assume is a valid location id.
	if ($("#locId").val().length == 8)
		saveToStorage(); 
	else
		isValidZipCode(
			function() {
				var locationDescription = $("#location").val();
	    	$("#locId").val(locationDescription);
				findMapLocation(locationDescription,validateLocation);
			}
		,
		function() {
			var locationDescription = $("#location").val();
			
			var startIndexParentesis = locationDescription.indexOf("(");
			if (startIndexParentesis != -1) {
				locationDescription = trim(locationDescription.substring(startIndexParentesis+1,locationDescription.lastIndexOf(")")));
			}
			
			findMapLocation(locationDescription,validateLocation);
		}
		, 
			alertInvalidLocation
		);
}

function isValidZipCode(validZipFunction, invalidZipFunction, errorFunction) {
	var locale = String.format("{0}_{1}",$('#language input:checked').val(), getRegion());
	var url = String.format("{0}/weather/local/{1}?siteLocale={2}&cc=*&dayf=2&prod=bd_select&par=chromev110XML", config.searchSite, $("#location").val(), locale);
  var xhr = new XMLHttpRequest();

  try {
    console.log("request..");
    xhr.onreadystatechange = function() { 
      if (xhr.readyState != 4)
        return;
			
      if (xhr.responseXML) {
        var xmlDoc = xhr.responseXML;
			 	var i = xmlDoc.evaluate( 'count(/weather/cc)', xmlDoc, null, XPathResult.ANY_TYPE, null ).numberValue;
		    
		    if (i > 0) {
	        console.log("valid zip");
	        validZipFunction(xmlDoc);
	        return;
	      }
	    }
	    
      console.log("invalid zip");
    	invalidZipFunction(xmlDoc);
    };
    
    xhr.onerror = function(error) {
	      console.log("error zip");
       	errorFunction(error);
    }

		console.log("url: " + url);
    xhr.open("GET", url, true);
    xhr.send(null);
  } catch(e) {
      console.log("error zip");
	  	errorFunction(e);
  }
}

function saveToStorage() {
		$("input[type='text'], input[type='radio']:checked, input[type='hidden'], select").each(
		function() {
			var $this = $(this);
			if ($this.attr("type") == "radio")
				localStorage[$this.attr("name")] = $this.val();
			else
				localStorage[$this.attr("id")] = $this.val();
		});
		//function init() {
		//	chrome.runtime.getBackgroundPage(init)
		//}
		//function updateFromConfiguration() {
		//	chrome.runtime.getBackgroundPage(updateFromConfiguration)
		//}
		chrome.runtime.getBackgroundPage(function(page) {
			page.init
			page.updateFromConfiguration
		});
		//alert(tr("options_updated"));
		window.close();
}

function alertInvalidLocation() {
	clearLocation();	
	alert(tr("options_invalid_city",$('#language input:checked').val()));
}

// Restores select box state to saved value from localStorage.
function restore_options() {
	var lang = localStorage['language'];
	if (!lang)
		return;
	
	loadRegions(lang);
	loadArea(lang);
	translate_ui(lang);
	
	for(i=0; i<localStorage.length;i++) {
		var key = localStorage.key(i);
		if (key == "language" || key == "gender")
			$("input[name='" + key + "'][value='" + localStorage.getItem(key) + "']").attr("checked","checked");
		else
			$("#" + key).val(localStorage.getItem(key));
	}
}

function validateLocation(xmlDoc) {
	 	var locFounds = xmlDoc.evaluate( 'count(/search/loc)', xmlDoc, null, XPathResult.ANY_TYPE, null ).numberValue;
	 	if (!isNaN(locFounds) && locFounds > 0)
	 	{
	 			var locationDescription = findTextContent(xmlDoc, "/search/loc[position()=1]");
	 			var startIndexParentesis = locationDescription.indexOf("(");
 				var locationId = findTextContent(xmlDoc, "/search/loc[position()=1]/@id");
	 			
	 			if (startIndexParentesis == -1 && locationId.length == 8)
	 			{
	 				var region = getRegion();
	 				if ( (region == 'DE' && locationId.indexOf('GM') != 0) ||
							 (region == 'BR' && locationId.indexOf('BR') != 0)) {
			  		alertInvalidLocation();
			  		return;
	  			}
	  			
	  			// If no locId is set, save the mapLocId.
	  			if ($("#locId").val() == "")
		 				$("#locId").val(locationId);
	  			
	 				$("#mapLocId").val(locationId);
	 				saveToStorage();
	 			}
	 			else 
	 			{
	 					// Strip zip code & search again to obtaing the locId
	 					var strippedLocation;
	 					
	 					if (startIndexParentesis != -1)
			 				strippedLocation = trim(locationDescription.substring(0,startIndexParentesis-1));
			 			else
			 				strippedLocation = trim(locationDescription);
			 				
	 					findMapLocation(strippedLocation,validateLocation);
	 			}
	 			
 				return;
	 	}
       
    alertInvalidLocation();
}

function findMapLocation(searchString, processFunction) {
	var locale = String.format("{0}_{1}",$('#language input:checked').val(), getRegion());
	var url = String.format("{0}/search/search?siteLocale={1}&where={2}", config.searchSite, locale, escape(searchString));
  var xhr = new XMLHttpRequest();

  try {
    console.log("request..");
    xhr.onreadystatechange = function() { 
      if (xhr.readyState != 4)
        return;
			
      if (xhr.responseXML) {
        var xmlDoc = xhr.responseXML;
	    	processFunction(xmlDoc);
	    }
    };
    
    xhr.onerror = function(error) {
      console.log("error");
      console.log(error);
    }

		console.log("url: " + url);
    xhr.open("GET", url, true);
    xhr.send(null);
  } catch(e) {
    console.log("ex: " + e);
    console.error("exception: " + e);
  }
}

var options, $ac;

function setupAutocomplete(lng, rgn)
{
	if (!lng)
		lng = $('#language input:checked').val();
	
	if (!rgn)
		rgn = getRegion();
		
	var locale = String.format("{0}_{1}",lng, rgn);
	options = { 
  	serviceUrl:String.format('{0}/search/search', config.searchSite), 
  	deferRequestBy: 300,
  	params: { 
  		siteLocale:locale
  		},
		onSelect: function(value, data){ $("#locId").val(data);  $("#mapLocId").val(data); },
  };
  $ac = $('#location').autocomplete(options);
}

function updateAutocompleteOptions(){
	var locale = String.format("{0}_{1}",$('#language input:checked').val(), getRegion());
	$ac.setOptions({ params: { siteLocale:locale } });
	$ac.clearCache();
}

$(document).ready(function() {
	loadDefaults();
	if (isFirstTime()) {
		loadRegions('en');
		loadArea('en');
		translate_ui('en');
		setupAutocomplete('en','US');
		$("#data-box").hide();
	}
	else 
	{
		restore_options();
		setupAutocomplete();
	}
	
	$("#language input").change(onLanguageChanged);
	$("#region").change(onRegionChanged);
	$("#location").keyup(function(e) { 
		if(e.keyCode != 13) $("#locId").val("");
	}).blur(toggleText).focus(toggleText);
	
});

var loading = new LoadingIndicator();

function LoadingIndicator() {
	this.start = function($elem) 
	{
		if ($(".load-indicator").length == 0) {
			var $loading = $("<img>").attr("src","images/ajax-loader.gif").attr("alt","Loading...").addClass("load-indicator");
			$elem.after($loading);
		}
	}
	
	this.finish = function() 
	{
		$(".load-indicator").remove();
	}
}

function toggleText() {
	var $this = $("#location");
	var message = getToggleText();
	
	if ($this.val() == "")
		$this.val(message).css("color","gray");
	else if ($this.val() == message)
		$this.val("").css("color","black");
}

function isToggleText() {
	var $this = $("#location");
	var message = getToggleText();
	return ($this.val() == message);
}

function getToggleText() {
	var lang = $('#language input:checked').val();
	if ($("#region").val() == "GB" && lang == "en")
		return tr("options_enterCity_uk",lang);
	else if ($("#region").val() == "US" && lang == "en")
		return tr("options_enterCity_us",lang);
	else if ($("#region").val() == "US" && lang == "es")
		return tr("options_enterCity_us",lang);
	else
		return tr("options_enterCity", lang);
}

function clearLocation() {
	updateAutocompleteOptions();
	$("#location").val("");
	toggleText();
}

function onRegionChanged() {
	clearLocation();
}

function onLanguageChanged() {
	loadRegions($(this).val());
	loadArea($(this).val());
	translate_ui($(this).val());
	clearLocation();
	$("#data-box").show('slow');
}

function loadDefaults() {
		var arrOptions = new Array();
		
		var d = new Date();
		var curr_year = d.getFullYear();
		for(i=curr_year-12; i >= curr_year - 90; i--)
			arrOptions.push([i, i]);

		var $region = $("#yearborn").empty();
		for(i=0;i<arrOptions.length;i++) 
		{
			$('<option>').text(arrOptions[i][1]).attr('value',arrOptions[i][0]).appendTo($region);
		}
		
		loadArea();
		
		$(window).keypress(function(e) {
    if(e.keyCode == 13) {
        save_options();
    }
});
}

function getRegion() {
	return Configuration.convertRegion($('#language input:checked').val(), $("#region").val());
}

function loadArea(language) {
		var $area = $("#area").empty();
		$('<option>').text(tr("options_area_weather",language)).attr('value',"weather").appendTo($area);
		$('<option>').text(tr("options_area_business",language)).attr('value',"business").appendTo($area);
		$('<option>').text(tr("options_area_outdoors",language)).attr('value',"outdoors").appendTo($area);
		$('<option>').text(tr("options_area_allergies",language)).attr('value',"allergies").appendTo($area);
}

function loadRegions(language) {
	var arrOptions = new Array();
	switch(language) {
		case "fr":
			arrOptions.push(["FR", "France"]);
			break;	
		case "de":
			arrOptions.push(["DE", "Deutschland"]);
			break;	
		case "pt":
			arrOptions.push(["BR", "Brasil"]);
			break;
		case "en":
			arrOptions.push(["US", "United States of America"]);
			arrOptions.push(["GB", "United Kingdom"]);
			arrOptions.push(["IN", "India"]);
			arrOptions.push(["SA", "South Africa"]);
			arrOptions.push(["OT", "Other"]);
			break;
  	case "es":
			arrOptions.push(["US", "Estados Unidos"]);
			arrOptions.push(["MX", "México"]);
			arrOptions.push(["ES", "España"]);
			arrOptions.push(["AR", "Argentina"]);
			arrOptions.push(["OT", "Otro"]);
			break;
		}
		
		var $region = $("#region").empty();
		for(i=0;i<arrOptions.length;i++) 
		{
			$('<option>').text(arrOptions[i][1]).attr('value',arrOptions[i][0]).appendTo($region);
		}
		
		if (arrOptions.length == 1)
			$region.attr("disabled", "disabled");
		else
			$region.attr("disabled", "");
}

function translate_ui(language) {
	$("#configuration").text(tr("options_configuration",language));
	$("#lbl_region").text(tr("options_region",language));
	$("#lbl_yearborn").text(tr("options_yearborn",language));
	$("#lbl_gender").text(tr("options_gender",language));
	$("#lbl_area").text(tr("options_area",language));
	$("#lbl_location").text(tr("options_location",language));
	$("#male").text(tr("options_male",language));
	$("#female").text(tr("options_female",language));
	$("#save").text(tr("options_save",language));
}
function clickHandler() {
	setTimeout(save_options, 1000);
}
document.addEventListener('DOMContentLoaded', function () {
	var elem = document.getElementById("save");
  elem.addEventListener('click', clickHandler);
});