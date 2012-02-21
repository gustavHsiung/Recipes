/**
 * @author Chia-Yuan Hsiung
 */

var win = Titanium.UI.currentWindow; 

//the data storage empty array
var data = []; 

//declare the ht tp cl ient object
var recipesHTTPClient = Titanium.Network.createHTTPClient();

//create a table view
var recipesTable = Titanium.UI.createTableView({
	height: 366,
	width: 	320,
	top: 	0,
	left: 	0
}); 
win.add(recipesTable);

// this method will process the remote data 
recipesHTTPClient.onload = function() {
	Ti.API.info(this.responseText);
	var xml = this.responseXML;
	//get item node list
	var items = xml.documentElement.getElementsByTagName("item");
	
	//get through each item 
	for(var i = 0; i < items.length; i++)
	{
		//create table row
		var row = Titanium.UI.createTableViewRow({
			title: items.item(i).getElementsByTagName("Title").item(0).text
		});
		//add the row to data array
		data.push(row);
	}
	// set the data to tableview's data
	recipesTable.data = data;
};

//this method will fire if there's an error in accessing the //remote data
recipesHTTPClient.onerror = function() {
	// log the error to our Ti tanium Studio console
	Ti.API.error(this.status + ' - ' + this.statusText);
}
;
//open the recipes xml feed
recipesHTTPClient.open('GET' , 'http://www.cuisine.com.au/feed/all-recipes');

//execute the call to the remote feed 
recipesHTTPClient.send();



