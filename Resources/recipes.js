/**
 * @author Chia-Yuan Hsiung
 */

var win = Titanium.UI.currentWindow; 

//declare the ht tp cl ient object
var xhr = Titanium.Network.createHTTPClient();

// this method will process the remote data 
xhr.onload = function() {
	Ti.API.info(this.responseText);
};

//this method will fire if there's an error in accessing the //remote data
xhr.onerror = function() {
	// log the error to our Ti tanium Studio console
	Ti.API.error(this.status + ' - ' + this.statusText);
}
;
//open the recipes xml feed
xhr.open('GET' , 'http://www.cuisine.com.au/feed/all-recipes');

//execute the call to the remote feed 
xhr.send();