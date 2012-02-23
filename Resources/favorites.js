/**
 * @author Chia-Yuan Hsiung
 */
Ti.include('database.js');

var win = Titanium.UI.currentWindow; 

//the data storage empty array
var data = []; 
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
var favoritesTable = Titanium.UI.createTableView({
	height: 366,
	width: 	320,
	top: 	0,
	left: 	0,
	search: searchBar,
	filterAttribute:'filter'
}); 
//tablerow selected function: create new window
favoritesTable.addEventListener('click', function(e){
	
	//get the selected row index
	var theFavorite = data[e.index];
			
	// create detail window
	var detailWindow = Titanium.UI.createWindow({
		_title:theFavorite.title,
		_description:theFavorite.description,
		_link:theFavorite.link,
		backgroundColor:'#fff',
		title:theFavorite.title,
		url: 'detail.js',
		id:0
	});
	
	Titanium.UI.currentTab.open(detailWindow);
});


function loadFavorites(){
	
	data = getFavorites();
	
	if(data.length>0){
		
		var tableData = [];
		//get through each item 
		for(var i = 0; i < data.length; i++)
		{
			var aFavorite = data[i];
		
			//create table row
			var row = Titanium.UI.createTableViewRow({
				_title:aFavorite.title,
				_description: aFavorite.description,
				_link:aFavorite.link,
				hasChild: true,
				className: 'favorite-row',
				filter: aFavorite.title,
				height:70,
				backgroundColor: '#fff'
			});
			//title label for row at index i
			var titleLabel = Titanium.UI.createLabel({
				text: aFavorite.title,
				font : {fontSize: 14, fontWeight : ' bold' },
				left: 70,
				top: 10,
				height: 50,
				width: 210,
				color:'#232'
			});
		
			row.add(titleLabel);
		
		
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
			tableData.push(row);
		}
		// set the data to tableview's data
		favoritesTable.data = tableData;
		win.add(favoritesTable);

	}else{
		var label2 = Titanium.UI.createLabel({
			color:'#999',
			text:'No Favorites yet.',
			font:{fontSize:20,fontFamily:'Helvetica Neue'},
			textAlign:'center',
			width:'auto',
			top: 100
		});

		win.add(label2);
	}
	
}
//the focus event l istener wi l l ensure that the l ist / / is refreshed whenever the tab is changed
win.addEventListener('focus', loadFavorites);
