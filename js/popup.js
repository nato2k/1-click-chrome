	//var data = chrome.extension.getBackgroundPage().weatherData;
		
	chrome.runtime.getBackgroundPage(function(page) {
		var data = page.weatherData;
		var todayLinkUri = page.weatherData.getTodayLink();
	});
		// var data = weatherData
	function init() {
		if (isFirstTime()) 
		{
			$("#main").hide();
			$("#nodata").show().click(function() { openTab("options.html"); }).css("cursor","pointer");
			return;
		}
		
	chrome.runtime.getBackgroundPage(function(page) {
		var data = page.weatherData;
		var todayLinkUri = page.weatherData.getTodayLink();
		console.log(todayLinkUri);
	});
		
		//if (!data.loaded) {
		//	$("#main").hide();
		//	$("#nodata").text(tr("connectionDown")).show();
		//	return;
		//}
		
		loadData();
}
function loadHandler() {
	setTimeout(init, 1000);
}
document.addEventListener('DOMContentLoaded', function () {
	//var elem = document.getElementById("full");
  window.addEventListener('load', loadHandler);
});
function loadData() {
	chrome.runtime.getBackgroundPage(function(page) {
		// Set logo
		$("#logo").attr("src",config.getLogoUri()).click(function() {openTab(config.getWeatherUri()); });
		console.log("weatheruri: " + config.getWeatherUri());
		
		// Set today links
		//var todayLinkUri = page.weatherData.getTodayLink();
		$("#current, #val_loca, #val_cond").css("cursor","pointer").click(function() { openTab(page.weatherData.getTodayLink()); });
		console.log("todayuri: " + page.weatherData.getTodayLink());
		// Set location
		$("#lbl_lupd").html(String.format("{2}<br/>{3}<br/>{0}<br/>{1}", tr('lastUpdated'), (page.weatherData.lastUpdated != "") ? formatDate(page.weatherData.lastUpdated) : tr("nonAvailable"), page.weatherData.sunrise, page.weatherData.sunset ));
		$("#val_loca").text(page.weatherData.cityName);

		$("#lbl_feelsLike").text(tr("feelsLike"));
		$("#lbl_humi").text(tr("humidity"));
		$("#lbl_visi").text(tr("visibility"));
		$("#lbl_wind").text(tr("wind"));
		
		$("#icon_cond").attr("src", "images/93x93/" + page.weatherData.icon);
		console.log(page.weatherData.hasCurrentCondition);
		if (page.weatherData.hasCurrentCondition) {
			// Set current conditions
			console.log(page.weatherData.condition);
			$("#val_cond").text(page.weatherData.condition);
			$("#val_temp").text(page.weatherData.temperature);
			$("#val_feelsLike").text(page.weatherData.feelsLike);
			$("#val_humi").text(page.weatherData.humidity);
			$("#val_visi").text(page.weatherData.visibility.formatDecimalPoint(config.siteLocale()));
			
			$("#val_wind").text(String.format(tr("windValue"), page.weatherData.windFrom, page.weatherData.windSpeed));
		}
		else
		{
			$("#val_cond").text(tr("stationDown"));
			$("#val_temp").text(tr("nonAvailable"));
			$("#val_feelsLike").text(tr("nonAvailable"));
			$("#val_humi").text(tr("nonAvailable"));
			$("#val_visi").text(tr("nonAvailable"));
			$("#val_wind").text(tr("nonAvailable"));
		}
		//if (page.weatherData.severeAlertsCount > 0 && config.siteLocale() == 'en_US') {
		if (page.weatherData.hasSevereAlerts() && config.siteLocale() == 'en_US') {
			console.log("Severe:" + page.weatherData.severeAlertsCount);
				$("#alert").click(function() { openTab(page.weatherData.getSevereAlertLink()); });
				console.log("Severe Link: " + page.weatherData.getSevereAlertLink())
		}
		else
				$("#alert").hide();

		$("#mapTitle").text(page.weatherData.getMapTitle());
		
		// Set Doppler Radar and Interactive Map whenever is needed.
		$("#mapImage").attr("src",page.weatherData.getMapImageUri());

		var mapLink = page.weatherData.getMapLink();
		if (!mapLink) {
			$("#lnkWeatherInMotion").hide();
	 		mapLink = todayLinkUri;
		}

		$("#mapImage, #lnkWeatherInMotion").click(function() { openTab(mapLink); }).css("cursor", "pointer");
			
		
		$("#lnkMapRoom").click(function() { openTab(page.weatherData.getMapRoomOrInteractiveLink()); });
		if (config.siteLocale() == 'en_US')
			$("#lnkMapRoom").text(tr("interactiveMap") + " >");
		else
			$("#lnkMapRoom").text(tr("mapRoom") + " >");
			
		$("#lnkWeatherInMotion").text(tr("weatherInMotion") + " >");

		// Set forecast links		
		$("#lnkHourByHour").click(function() { openTab(page.weatherData.getHourByHourLink()); });
		$("#lnkHourByHour").text(tr("hourByHour") + " >");
		$("#lnkExtendedOutlook").click(function() { openTab(page.weatherData.getExtendedOutlookLink()); });
		$("#lnkExtendedOutlook").text(tr("day10") + " >");
		
		$("#forecast1").css("background","url(../images/52x52/" +page.weatherData.forecastToday.icon + ") no-repeat 91% 20%");
		$("#forecast2").css("background","url(../images/52x52/" +page.weatherData.forecastNext.icon + ") no-repeat 91% 20%");
		
		if (page.weatherData.forecastToday.dayPart == "d") {
			$("#titleForecast").text(tr("todayOutlook"));
			$("#part1_day").text(tr("today"));
			$("#part1_val_temp").text(page.weatherData.forecastToday.highTemperature);
		}
		else 
		{
			$("#titleForecast").text(tr("outlook"));
			$("#part1_day").text(tr("tonight"));
			$("#part1_val_temp").text(page.weatherData.forecastToday.lowTemperature);
		}
		
		if (page.weatherData.forecastNext.dayPart == "n")	{
			$("#part2_day").text(tr("tonight"));
			$("#part2_val_temp").text(page.weatherData.forecastNext.lowTemperature);
			$("#forecast1").click(function() { openTab(page.weatherData.getForecastTodayLink()); });
			$("#forecast2").click(function() { openTab(page.weatherData.getForecastTodayLink()); });
		}
		else {
			$("#part2_day").text(tr("tomorrow"));
			$("#part2_val_temp").text(page.weatherData.forecastNext.highTemperature);
			$("#forecast1").click(function() { openTab(page.weatherData.getForecastTodayLink()); });
			$("#forecast2").click(function() { openTab(page.weatherData.getForecastTomorrowLink()); });
		}
		
		$(".lbl_prec").html(tr("changePrecip"));
		$("#part1_val_prec").text(page.weatherData.forecastToday.precipitation);
		$("#part2_val_prec").text(page.weatherData.forecastNext.precipitation);
	
});
}
String.prototype.formatDecimalPoint = function(siteLocale) {
	return this.replace(".","#").replace(",",".").replace("#",".");
/*	if (siteLocale == "en_US" || siteLocale == "en_IN"  || siteLocale == "en_GB"  || siteLocale == "es_US"  || siteLocale == "es_MX")
		return this.replace(".","#").replace(",",".").replace("#",".");
	else	
		return this.replace(",","#").replace(".",",").replace("#",",");*/
}

function formatDate(input) {
		
		var formattedDate;
		try {
			
			var dt2;
	 		var timezone;
	
			if (input.indexOf(" Local Time") != -1) {
				dt2 = Date.parseDate(input.replace(" Local Time",""), "n/j/y g:i A");
				timezone = " " + tr("localTime");
			}
			else {
				dt2 = Date.parseDate(input, "n/j/y g:i A T");
				timezone = input.substring(input.lastIndexOf(" "));
			}
		
			if (dt2) 
			{
			  if (config.siteLocale() == 'en_US')
				  formattedDate = dt2.dateFormat("M d g:i a",false) + timezone;
				else
				  formattedDate = dt2.dateFormat("d M H:i",true) + timezone;
			}
			else
				formattedDate = input;
		}
		catch(e)
		{
			formattedDate = input;
		}
		
		return formattedDate;
}