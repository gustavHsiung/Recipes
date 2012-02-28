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
	filterAttribute:'filter',
	editable: true,
	deleteButtonTitle: 'Remove'
}); 
//tablerow selected function: create new window
favoritesTable.addEventListener('click', function(e){
	//get the selected row index
	var theFavoriteIndex = e.index;
	enterDetailView(theFavoriteIndex);
});



favoritesTable.addEventListener('delete', function(e){
	var removedID = data[e.index].id;
	
	deleteFavorite(removedID);
	Ti.API.info('>>>>>>>>>>>>>>>>>>>>>>Deleted favorite records. (id ' + removedID + ')');
		
});

win.add(favoritesTable);
favoritesTable.hide();		
	
//no favorite label
var noFavLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'No Favorites yet.',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	height:40,
	width:'auto',
	top: 100,

});
win.add(noFavLabel);
noFavLabel.hide();
		
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
				dataIndex:i,
				_title:aFavorite.title,
				_description: aFavorite.description,
				_link:aFavorite.link,
				hasChild: true,
				className: 'favorite-row',
				filter: aFavorite.title,
				height:70,
				backgroundColor: '#fff',
				
			});
			//title label for row at index i
			var titleLabel = Titanium.UI.createLabel({
				text: aFavorite.title,
				font : {fontSize: 14, fontWeight : ' bold' },
				left: 70,
				top: 10,
				height: 50,
				width: 210,
				color:'#232',
				dataIndex:i
			});

			row.add(titleLabel);
		
			//add our little icon to the left of the row 
			var iconImage = Titanium.UI.createImageView({
				image: 'img/eggcooking.png',
				width: 50,
				height: 50,
				left: 10,
				top: 10 
			});
			
			row.add(iconImage);
			
			//when app is running on Android platform, show 
			//remove favorite alert when longClick event is triggered 
			if(Ti.Platform.osname == 'android'){
				row.addEventListener('longclick', function(e){
					Ti.API.info(e.source);
					
					//get the selected row index
					var theFavoriteIndex = e.source.dataIndex;
					showRemoveAlert(theFavoriteIndex);
					
				});
			}

			//add the row to data array
			tableData.push(row);
		}
		// set the data to tableview's data
		favoritesTable.data = tableData;
		favoritesTable.show();
		noFavLabel.hide();
	}else{
		favoritesTable.hide();
		noFavLabel.show();
	}
	
}
//the focus event l istener wi l l ensure that the l ist / / is refreshed whenever the tab is changed
win.addEventListener('focus', loadFavorites);

function removeFavoriteRow(rowIndex)
{
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>> row "+rowIndex+" is going to be deleted.");
	favoritesTable.deleteRow(rowIndex);
	
}
function showRemoveAlert(theFavoriteIndex)
{
	var aFavorite = data[theFavoriteIndex];
	var alertDialog = Titanium.UI.createAlertDialog({
		rowIndex:theFavoriteIndex,
    	title: 'Remove',
    	message: 'Do you want to remove recipe:\"'+aFavorite.title+'\" from your favories ?',
    	buttonNames: ['OK','Doh!']
	});
	alertDialog.addEventListener('click',removeAlertClick);
	alertDialog.show();
}
function removeAlertClick(e)
{
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>user click: "+ e.index );
	
	if(e.cancel || e.index == 1)
	{
		return;
	}else{
		var deletingIndex = e.source.rowIndex;
		removeFavoriteRow(deletingIndex);
		var removedID = data[deletingIndex].id;
	
		deleteFavorite(removedID);
		Ti.API.info('>>>>>>>>>>>>>>>>>>>>>>Deleted favorite records. (id ' + removedID + ')');

	}
	
}
function enterDetailView(dataIndex)
{
	//Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>go  a row: "+ e.source.rowIndex +" detail.");
	var theFavorite = data[dataIndex];
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>go  a recipe: "+ theFavorite.title);
			
	// create detail window
	var detailWindow = Titanium.UI.createWindow({
		id:theFavorite.id,
		_title:theFavorite.title,
		_description:theFavorite.description,
		_link:theFavorite.link,
		backgroundColor:'#fff',
		title:theFavorite.title,
		url: 'detail.js',
		id:0
	});
	
	Titanium.UI.currentTab.open(detailWindow);
}
