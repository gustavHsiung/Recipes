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
	var selectedRow = e.rowData;
	Ti.API.info(">>>>>>>>>>>>selectedRow.title "+selectedRow.title);
	Ti.API.info(">>>>>>>>>>>>selectedRow.description "+selectedRow.description);
	
	// create detail window
	var detailWindow = Titanium.UI.createWindow({
		_title:selectedRow.title,
		_description:selectedRow.description,
		_link:selectedRow.link,
		backgroundColor:'#fff',
		url: 'detail.js',
		id:0
	});
	
	Titanium.UI.currentTab.open(detailWindow);
});


function loadFavorites(){
	data = getFavorites();
	if(data.length>0){
		for(var i = 0; i<data.length; i++){
			var sqlReaultSet = data[i];
			Ti.API.warn(">>>>>>>>>>>>>>>>>>>>>>>>>>>> "+sqlReaultSet.id+":"+sqlReaultSet.title+", "
		+sqlReaultSet.description+","+sqlReaultSet.link);

		}
		favoritesTable.data = data;
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
