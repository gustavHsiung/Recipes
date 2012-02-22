/**
 * @author Chia-Yuan Hsiung
 */
Ti.include('database.js');

var win = Titanium.UI.currentWindow; 

//the data storage empty array
var data = []; 

//declare the ht tp cl ient object
var recipesHTTPClient = Titanium.Network.createHTTPClient();

//define search bar which will attach to  table view
var searchBar = Titanium.UI.createSearchBar({
	showCancel:true,
	height :43,
	top:0
});

//print out the searchbar value whenever it changes 
searchBar.addEventListener('change' , function(e){
	
	Ti.API.info('user searching for: ' + e.value);
});
//when the return key is hit, make searchBar get blur
searchBar.addEventListener('return' , function(e){
	searchBar.blur(); 
});

//when the cancel but ton is tapped,make searchBar get blur too
searchBar.addEventListener('cancel', function(e){
	searchBar.blur();
});
//end of search bar


//create a table view
var recipesTable = Titanium.UI.createTableView({
	height: 366,
	width: 	320,
	top: 	0,
	left: 	0,
	search: searchBar,
	filterAttribute:'filter'
}); 
win.add(recipesTable);

// this method will process the remote data 
recipesHTTPClient.onload = function() {
	
	//create a json object using the JSON.PARSE function
	
	var jsonObject = JSON.parse(this.responseText);
	
	//get through each item 
	for(var i = 0; i < jsonObject.query.results.entry.length; i++)
	{
		var aFeed = jsonObject.query.results.entry[i];
		
		//create table row
		var row = Titanium.UI.createTableViewRow({
			hasChild: true,
			className: 'recipe-row',
			filter: aFeed.title.content,
			height:'auto',
			backgroundColor: '#fff'
		});
		//title label for row at index i
		var titleLabel = Titanium.UI.createLabel({
			text: aFeed.title.content,
			font : {fontSize: 14, fontWeight : ' bold' },
			left: 70,
			top: 5,
			height: 20,
			width: 210,
			color:'#232'
		});
		
		row.add(titleLabel);
		
		//description view for row at index i
		var descriptionLabel = Titanium.UI.createLabel({
				font : {fontSize: 10, fontWeight : ' normal ' },
				left: 	70,
				top: 	titleLabel.height+5,
				width: 	200,
				color:	'#9c9'
		});
		
		if(aFeed.content.content.length == 0) {
			
			descriptionLabel.text = 'No description is available.'; 
			descriptionLabel.height = 20;
				
		}else{
			descriptionLabel.text = aFeed.content.content;
			descriptionLabel.height = 45;
					
		}
		row.add(descriptionLabel);
		row.height = titleLabel.height + descriptionLabel.height +15;
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

Ti.API.info(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>open");
	
//open the recipes xml feed
recipesHTTPClient.open('GET' , 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D\'http%3A%2F%2Fwww.foodandwine.com%2Ffeeds%2Flatest_recipes%3Fformat%3Datom\'&format=json&diagnostics=true');
//'http://rss.allrecipes.com/daily.aspx?hubID=80');
//'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D\'http%3A%2F%2Frss.allrecipes.com%2Fdaily.aspx%3FhubID%3D80\'&format=json&diagnostics=true&callback=cbfunc');//
//execute the call to the remote feed 
recipesHTTPClient.send();



