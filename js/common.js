var config = new Configuration();

// Translations texts
var translations = 
{
	es : {
		lastUpdated : '�ltima actualizaci�n:', 
		temperature : 'Temperatura:', 
		humidity : 'Humedad:', 
		visibility : 'Visibilidad:', 
		pressure : 'Presi�n:',
		pressureValue : '{0}, {1}',
		wind : 'Viento:',
		windValue : 'De {0} a {1}',
		windValueWithGusting : 'De {0} a {1}, r�faga de viento a {2}',
		today : 'Hoy',
		tonight : 'Por la noche',
		tomorrow : 'Ma�ana',
		high : 'M�xima:',
		low : 'M�nima:',
		changePrecip : 'Probabilidad de precip.:',
		weatherInMotion : 'Animaci�n',
		hourByHour : 'Hora por hora',
		day10: 'A 10 d�as',
		mapRoom : 'Mapas',
		severeAlerts : 'Severe alerts',
		feelsLike : 'Sens. t�rmica',
		todayOutlook : 'Las probabilidades de hoy',
		outlook : 'Pron�stico',
		satelliteMap : 'Satelital',
		options : 'Opciones',
		options_save : 'Guardar',
		options_enterCity : 'Entre una localidad',
		options_enterCity_us: 'Entre un c�digo postal o localidad',
		options_go : 'Ir',
		options_configuration : 'Configuraci�n',
		options_region : 'Seleccionar la regi�n:',
		options_yearborn : 'A�o de nacimiento:',
		options_gender : 'G�nero:',
		options_area : 'Area de inter�s:',
		options_location : 'Localidad predeterminada:',
		options_male : 'Hombre',
		options_female : 'Mujer',
		options_area_weather : 'Informaci�n b�sica del tiempo',
		options_area_business : 'Viaje de negocios',
		options_area_outdoors : 'Al aire libre',
		options_area_allergies : 'Alergias',
		options_invalid_city : 'La ciudad o c�digo postal no es v�lido. Intente otro.',
		options_empty_city : 'Por favor ingrese su ciudad o c�digo postal.',
		options_updated : 'Sus seteos han sido actualizados.',
		localTime : 'Hora Local',
		stationDown : 'La estaci�n no responde',
		nonAvailable : 'N/D',
		connectionDown : 'Connection down',
		connectionDownTitle : 'Connection down'
	},
	en : {
		lastUpdated : 'Last Updated:', 
		temperature : 'Temperature:', 
		humidity : 'Humidity:', 
		visibility : 'Visibility:', 
		pressure : 'Pressure:',
		pressureValue : '{0}, {1}',
		wind : 'Wind:',
		windValue : 'From {0} at {1}',
		windValueWithGusting : 'From {0} at {1}, gusting to {2}',
		today : 'Today',
		tonight : 'Tonight',
		tomorrow : 'Tomorrow',
		high : 'High:',
		changePrecip : 'Chance of Precip:',
		weatherInMotion : 'Weather in Motion',
		hourByHour : 'Hour-by-hour',
		day10: 'Extended Outlook',
		mapRoom : 'Map Room',
		interactiveMap : 'Interactive Map',
		severeAlerts : 'Active alerts >',
		feelsLike : 'Feels like',
		todayOutlook : "Today's Outlook",
		outlook : 'Outlook',
		satelliteMap : 'Satellite Map',
		dopplerRadarMap : 'Doppler Radar',
		options : 'Options',
		options_save : 'Save',
		options_enterCity : 'Enter city name',
		options_enterCity_us : 'Enter City or U.S. Zip Code',
		options_enterCity_uk : 'Enter your city or postcode area and district (e.g. W1A)',
		options_go : 'Go',
		options_configuration : 'Configuration',
		options_region : 'Select region:',
		options_yearborn : 'Year of birth:',
		options_gender : 'Gender:',
		options_area : 'Area of interest:',
		options_location : 'Default location:',
		options_male : 'Male',
		options_female : 'Female',
		options_area_weather : 'Basic Weather Information',
		options_area_business : 'Business Travel',
		options_area_outdoors : 'Outdoors',
		options_area_allergies : 'Allergies',
		options_invalid_city : 'The city/zipcode is invalid. Try another one.',
		options_empty_city : 'Please enter your city or zip code',
		options_updated : 'Your settings were updated successfully',
		localTime : 'Local Time',
		stationDown : 'Station Is Not Reporting',
		nonAvailable : 'N/A',
		connectionDown : 'Connection down',
		connectionDownTitle : 'Connection down'
	},
	pt : {
		lastUpdated : '�ltima atualiza��o:', 
		temperature : 'Temperatura:', 
		humidity : 'Umidade:', 
		visibility : 'Visibilidade:', 
		pressure : 'Bar�metro:',
		pressureValue : '{0}, {1}',
		wind : 'Vento:',
		windValue : 'Do {0} � {1}',
		windValueWithGusting : 'Do {0} � {1},rajada � {2}',
		today : 'Hoje',
		tonight : 'Esta Noite',
		tomorrow : 'Amanh�',
		high : 'M�x:',
		low : 'M�n:',
		changePrecip : 'Possibilidade de precip.:',
		weatherInMotion : 'Mapa animado',
		hourByHour : 'Previs�o de hora em hora',
		day10: 'Previs�o para 10 dias',
		mapRoom : 'Mapas',
		severeAlerts : 'Severe alerts',
		feelsLike : 'Sensa��o de',
		todayOutlook : 'Previs�o',
		outlook : 'Previs�o',
		satelliteMap : 'Imagem do Sat�lite',
		options : 'Op��es',
		options_save : 'Salvar',
		options_enterCity : 'Escreva o nome da cidade ou pais',
		options_go : 'Ir',
		options_configuration : 'Configura��o',
		options_region : 'Selecione a regi�o:',
		options_yearborn : 'Ano do nascimento:',
		options_gender : 'Sexo:',
		options_area : '�rea de interesse:',
		options_location : 'Local padr�o:',
		options_male : 'Homem',
		options_female : 'Mulher',
		options_area_weather : 'Informa��es b�sicas sobre o tempo',
		options_area_business : 'Viagem de neg�cios',
		options_area_outdoors : 'Esportes ao ar livre',
		options_area_allergies : 'Alergias',
		options_invalid_city : 'A cidade ou CEP est�o inv�lidos.  Tente novamente',
		options_empty_city : 'Digite o nome da cidade ou CEP',
		options_updated : 'Seus dados foram atualizados com sucesso.',
		localTime : 'Hor�rio local',
		stationDown : 'A esta��o n�o est� relatando',
		nonAvailable : 'N/A',
		connectionDown : 'Connection down',
		connectionDownTitle : 'Connection down'
	},
	fr : {
		lastUpdated : 'Derni�re mise � jour:', 
		temperature : 'Temp�rature :', 
		humidity : 'Humidit� :', 
		visibility : 'Visibilit� :', 
		pressure : 'Pression :',
		pressureValue : '{0}, {1}',
		wind : 'Vent :',
		windValue : '{0} � {1}',
		windValueWithGusting : '{0} � {1}',
		today : 'Aujourd�hui',
		tonight : 'Nuit',
		tomorrow : 'Demain',
		high : 'Max.:',
		low : 'Min. :',
		changePrecip : 'Risque de pr�cip.:',
		weatherInMotion : 'Animation',
		hourByHour : 'Heure par heure',
		day10: 'A 10 jours',
		mapRoom : 'Cartes',
		severeAlerts : 'Severe alerts',
		feelsLike : 'Temp. ressentie',
		todayOutlook : 'Pr�visions',
		outlook : 'Pr�visions',
		satelliteMap : 'Satellite',
		options : 'Options',
		options_save : 'Sauvegarder',
		options_enterCity : 'Entrez ville ou code postal',
		options_go : 'Go',
		options_configuration : 'Configurations',
		options_region : 'S�lectionnez une r�gion:',
		options_yearborn : 'Ann�e de naissance:',
		options_gender : 'Genre:',
		options_area : 'Centre d\'int�r�t:',
		options_location : 'Emplacement par d�faut:',
		options_male : 'Homme',
		options_female : 'Femme',
		options_area_weather : 'Informations m�t�orologiques g�n�rales',
		options_area_business : 'Voyage d\'affaires',
		options_area_outdoors : 'A l\�ext�rieur',
		options_area_allergies : 'Allergies',
		options_invalid_city : 'Aucun enregistrement trouv�. Veuillez entrer une autre ville ou code postal.',
		options_empty_city : 'Veuillez entrer une ville ou code postal',
		options_updated : 'Vos param�tres ont �t� actualis�s.',
		localTime :  'Heure locale',
		stationDown : 'Station ne r�pondant pas',
		nonAvailable : 'N/A',
		connectionDown : 'Connection down',
		connectionDownTitle : 'Connection down'
	},
	de : {
		lastUpdated : 'Neueste Aktualisierung am:', 
		temperature : 'Temperatur:', 
		humidity : 'Luftfeuchtigkeit:', 
		visibility : 'Sicht:', 
		pressure : 'Luftdruck:',
		pressureValue : '{0}, {1}',
		wind : 'Wind:',
		windValue : 'Aus {0} mit {1}',
		windValueWithGusting : 'aus {0} mit {1}, mit B�en bis zu {2}',
		today : 'Heute',
		tonight : 'Heute Nacht',
		tomorrow : 'Morgen',
		high : 'Max:',
		low : 'Min:',
		changePrecip : 'Niederschl. Wahrsch.:',
		weatherInMotion : 'Animation',
		hourByHour : 'Rund um die Uhr',
		day10: '10-Tage-Vorhersage',
		mapRoom : 'Karten',
		feelsLike : 'Gef�hlte Temp.',
		todayOutlook : 'Aussichten f�r heute',
		outlook : 'Wetteraussichten',
		satelliteMap : 'Satellitenkarte',
		options : 'Auswahl',
		options_save : 'Speichern',
		options_enterCity : 'Stadtnamen oder Postleitzahl eingeben',
		options_go : 'Los!',
		options_configuration : 'Systemeinstellung',
		options_region : 'Region ausw�hlen:',
		options_yearborn : 'Geburtsjahr:',
		options_gender : 'Geschlecht:',
		options_area : 'Interessengebiet:',
		options_location : 'Standardort:',
		options_male : 'M�nnlich',
		options_female : 'Weiblich',
		options_area_weather : 'Allgemeine Wetterinformationen',
		options_area_business : 'Gesch�ftsreise',
		options_area_outdoors : 'An der frischen Luft',
		options_area_allergies : 'Allergien',
		options_invalid_city : 'Die Stadt/Postleitzahl ist ung�ltig. Bitte probieren sie eine andere.',
		options_empty_city : 'Bitte geben Sie Ihre Stadt oder Postleitzahl ein.',
		options_updated : 'Ihre Einstellungen wurden erfolgreich aktualisiert.',
		localTime: 'Local Time',
		stationDown : 'Station ist nicht Berichterstattung',
		nonAvailable : 'N/A',
		connectionDown : 'Connection down',
		connectionDownTitle : 'Connection down'
	}
}

// Returns the translated text for the language passed, if no language passed uses localstorage.
function tr(key, lang) {
	if (!lang)
		lang = localStorage['language'];
		
	if (!lang)
		lang = "en";
		
	return translations[lang][key];
}

// Simplify formatting
String.format = function()
{
  var replacements = arguments;
  return arguments[0].replace(/\{(\d+)\}/gm, function(string, match) {
	//return replacements[parseInt(match) + 1];
	return typeof replacements[parseInt(match) + 1] != 'undefined'
	? replacements[parseInt(match) + 1]
	: string
	;
	
  });
}

// Determine if the system is not initialized with the user location
function isFirstTime() {
	var lang = localStorage['language'];
	return (!lang); 
}

function padDigits(n, totalDigits) 
{ 
    n = n.toString(); 
    var pd = ''; 
    if (totalDigits > n.length) 
    { 
        for (i=0; i < (totalDigits-n.length); i++) 
        { 
            pd += '0'; 
        } 
    } 
    return pd + n.toString(); 
} 

function Configuration() 
{
	this.locId = function() { return localStorage["locId"] }
	this.mapLocId = function() { return localStorage["mapLocId"] }
	this.siteLocale = function() { return String.format("{0}_{1}",this.language(), this.region()); }
	this.language = function() { return localStorage['language']; }
	this.area = function() { return localStorage['area']; }
	this.region = function() { 
		return Configuration.convertRegion(this.language(), localStorage['region']); 
	}
	
	//this.searchSite = "http://chr.1click.weather.com";
	this.searchSite = "http://wxdata.weather.com/wxdata";
	//this.searchSite = "http://builddata.weather.com";
	this.location = function() { return localStorage["location"] }
	
	this.getBaseUri = function() {
		if (this.siteLocale() == "en_US")
			return String.format("{0}/{1}", this.getBaseSite(), this.areaPath());
		else
			return String.format("{0}/weather", this.getBaseSite());
	}
	
	this.getBaseSite = function() {
		return String.format("http://{0}.weather.com", this.trafficUri());
	}
	
	this.isLocatedInUS = function() {
		return (this.mapLocId().substring(0,2) == "US");
	}
	
	this.getTrackingCode = function() {
		switch(config.siteLocale()) {
			case "en_US":
				return "Chrome";
			case "en_GB":
				return "chrome_uk";
			case "en_IN":
				return "chrome_in";
			case "fr_FR":
				return "chrome_fr";
			case "de_DE":
				return "chrome_de";
			case "pt_BR":
				return "chrome_br";
			default:
				return "chrome_es";
		}
	}
	
	this.getWeatherUri = function() {
		switch(config.siteLocale()) {
			case "en_US":
				return String.format("{0}/?par=chromev1.1.0&site=us-logo&cm_ven=Chrome&cm_cat=chromev1.1.0&cm_pla=us-logo&cm_ite=Logo",this.getBaseSite());
			case "en_GB":
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_uk&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
			case "en_IN":
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_in&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
			case "fr_FR":
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_fr&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
			case "de_DE":
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_de&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
			case "pt_BR":
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_br&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
			default:
				return String.format("{0}/?par=chromev1.1.0&site=weather&promo=0&cm_ven=chrome_es&cm_cat=chrome&cm_ite=weather&cm_pla=logo",this.getBaseSite());
		}
	}
	this.trafficUri = function() {
			var uri = "";
			var reg = this.region();
			
			switch(this.language()) 
			{
				case "en":
					switch(reg) 
					{
						case "US": uri = "www"; break;
						case "GB": uri = "uk"; break;
						case "IN": uri = "in"; break;
						default: uri = "uk"; break;
					}
					break;
				case "es":
					uri = "espanol";
					break;
				case "fr":
					uri = "fr";
					break;
				case "de":
					uri = "de";
					break;
				case "pt":
					uri = "br";
					break;
			}
			
			return uri;
		}
		
		this.getLogoUri = function() {
			var code = this.trafficUri();
			if (code == "www")
				code = "us";
			return String.format("{0}{1}.png","images/logo/logo_", code);
		}		
		
		this.areaPath = function() {
			var uriPath = "weather";
			
			switch(config.area()) 
			{
				case "business":
					uriPath = "outlook/travel/businesstraveler";
					break;
				case "outdoors":
					uriPath = "outlook/recreation/outdoors";
					break;
				case "allergies":
					uriPath = "outlook/health/allergies";
					break;
			}
			
			return uriPath;
		}
}

Configuration.convertRegion = function(lng, reg) 
{
		if (reg == "SA")
			return "GB";
			
		if (reg == "OT") 
		{
			if (lng == 'en')
				return "GB";
			else
				return "MX";
		}
		
		return reg;
}


function findTextContent(xmlDoc, xPath) {
  var fullCountSet = xmlDoc.evaluate(xPath,
    xmlDoc, null, XPathResult.ANY_TYPE, null);
  var fullCountNode = fullCountSet.iterateNext();
  if (fullCountNode) {
  	return fullCountNode.textContent;
  } else {
  	return "";
    console.log(xPath + " not found!");
  }
}

function hasNode(xmlDoc, xPath) {
  var fullCountSet = xmlDoc.evaluate(xPath,
  xmlDoc, null, XPathResult.ANY_TYPE, null);
  var fullCountNode = fullCountSet.iterateNext();
  return (fullCountNode);
}

function trim(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function openTab(uri) {
  try {
    chrome.tabs.create({ url: uri});
  } catch (e) {
    console.log(e);
  }
}
