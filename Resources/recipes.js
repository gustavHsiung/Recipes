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
	left: 	0,
	backgroundColor: ""
}); 
win.add(recipesTable);

// this method will process the remote data 
recipesHTTPClient.onload = function() {
	//var xml = this.responseXML.documentElement//this.responseXML;
	//var doc = this.responseXML.documentElement;
	var doc = this.responseXML.documentElement;
	
	//get item node list
	var channel = doc.getElementsByTagName("channel").item(0);
	var items = channel.getElementsByTagName("item");
	//get through each item 
	for(var i = 0; i < items.length; i++)
	{
		var content = items.item(i);
		var title = content.getElementsByTagName("title").item(0).text;
		
		// test
		var descriptionTag = content.getElementsByTagName("description").item(0).text;
		Ti.API.info(descriptionTag);
	
		var description = content.getElementsByTagName("description").item(0).text;
		
		//create table row
		var row = Titanium.UI.createTableViewRow({
			hasChild: true,
			className: 'recipe-row',
			height:'auto'
		});
		//title label for row at index i
		var titleLabel = Titanium.UI.createLabel({
			text: title,
			font : {fontSize: 14, fontWeight : ' bold' },
			left: 70,
			top: 5,
			height: 20,
			width: 210
		});
		
		row.add(titleLabel);
		
		//description view for row at index i
		
		
		if(description.length == 0) {
			var descriptionLabel = Titanium.UI.createLabel({
				font : {fontSize: 10, fontWeight : ' normal ' },
				left: 70,
				top: 25,
				height: 40,
				width: 200
			});
			descriptionLabel.text = 'No description is available.'; 
			row.add(descriptionLabel);
		
		}else{
			var xhtml = '<html><body width="100%" height="100%"><h3>'+ title +'</h3>' +description+ '</body></html>';
			var rowWeb = Ti.UI.createWebView({
				html: xhtml,
				scalesPageToFit: true,
				touchEnabled: false,
				top:25,
				left:70,
				width: 200,
				height: (description.length < 475)? 100 : 150,
				backgroundColor: 'transparent'
			});
		
			row.add(rowWeb);		
		}
		//add our little icon to the left of the row 
		var iconImage = Titanium.UI.createImageView({
			image: 'img/eggpan.png',
			width: 50,
			height: 50,
			left: 10,
			top: 10 
		});
		row.add(iconImage);
		
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
recipesHTTPClient.open('GET' , 'http://rss.allrecipes.com/daily.aspx?hubID=80');//'http://tw.news.yahoo.com/rss/sports');//'http://vimeo.com/api/docs/simple-api');

//execute the call to the remote feed 
recipesHTTPClient.send();



