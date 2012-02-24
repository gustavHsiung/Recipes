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
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>huzzah, a row ("+e.index+") was clicked");
	
	//get the selected row index
	var theFavorite = data[e.index];
			
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
});
//handel swipe to delete
/*
favoritesTable.addEventListener('swipe', function(e){
	e.row.removeButton.show();	
	e.row.removeButton.addEventListener('click',function(e){	
		removeFavoriteRow(e.row.index);
	});
	favoritesTable.removeEventListener('click');
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>huzzah, a row was swiped");
});
*/

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
				image: 'img/eggcooking.png',
				width: 50,
				height: 50,
				left: 10,
				top: 10 
			});
			
			row.add(iconImage);
			
			//remove button
			var removeButton = Titanium.UI.createButton({
				title: 'Remove',
				right: 	10,
				top:	20,
				width: 	61,
				height:	30,
				font : {fontSize: 10, fontWeight : 'bold' },
				color: '#fff',
				shadowColor:"#121",
				backgroundImage:"img/remove_normal.png",
				backgroundSelectedImage:"img/remove_pressed.png"
			});
			removeButton.hide();
			row.add(removeButton);
			
			
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

if(Ti.Platform.osname != 'iphone'){
				Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>enableSwipe ");
	
				enableSwipe	(win,false,10);	
				win.addEventListener("swipe", function(e) { 
					Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>swipe "+e.x);
				});
}
			
function removeFavoriteRow(rowIndex)
{
	Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>> row "+rowIndex+" is going to be deleted.");
	favoritesTable.deleteRow(rowIndex);
	
}
function enableSwipe (view, allowVertical, tolerance) {
 
 	tolerance = tolerance || 2;
 
    var start;
 
    view.addEventListener('touchstart', function(evt) {
 		Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>huzzah, a row ("+start+") touchend");
	
        start = evt;
 
    });
 
    view.addEventListener('touchend', function (end) {
 
        var dx = end.x - start.x, dy = end.y - start.y;
 
        var dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
 
        // only trigger if dragged further than 50 pixels
 		Titanium.API.info(">>>>>>>>>>>>>>>>>>>>>>huzzah, a row ("+dist+") touchend");
	
        if (dist < 50) {
 
            return;
 
        }
 
        var isVertical = Math.abs(dx / dy) < 1 / tolerance;
 
        var isHorizontal = Math.abs(dy / dx) < 1 / tolerance;
 
        // only trigger if dragged in a particular direction
 
        if (!isVertical && !isHorizontal) {
 
            return;
 
        }
 
        // disallow vertical swipe, depending on the setting
 
        if (!allowVertical && isVertical) {
 
            return;
 
        }
 
        // now fire the event off so regular 'swipe' handlers can use this!
 
        end.direction = isHorizontal ? ((dx < 0) ? 'left' : 'right') : ((dy < 0) ? 'up' : 'down');
 
        end.type = 'swipe';
 
        view.fireEvent('swipe', end);
 
    });
 
 
 
}