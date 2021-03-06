function PreferencesManager() {
	autolock = false;
	preferences = new Lawnchair('preferences');
	/*preferences.get("autolock", function(r){
						autolock = r.shouldAutolock;
						var autolockToggleLink = document.getElementById("autolockToggle");
						PhoneGap.exec("Device.autolockToggle", autolock);
						(!autolock) ? autolockToggleLink.innerHTML = "Turn Autolock <b>Off</b>" : autolockToggleLink.innerHTML = "Turn Autolock <b>On</b>";			
					});*/
		
	this.autolockToggle = function() {
		var autolockToggleLink = document.getElementById("autolockToggle");
		autolock = !autolock;
		(!autolock) ? autolockToggleLink.innerHTML = "Turn Autolock <b>Off</b>" : autolockToggleLink.innerHTML = "Turn Autolock <b>On</b>";			
		PhoneGap.exec("Device.autolockToggle", autolock);
		preferences.save({key:"autolock", shouldAutolock:autolock});
	}
	
	this.changePort = function(newPort) {
		PhoneGap.exec("OSCManager.setOSCReceivePort", parseInt(newPort));
	}
	
	this.changePort(51000);
	return this;
}