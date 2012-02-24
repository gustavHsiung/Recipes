/**
 * @author Chia-Yuan Hsiung
 */
Ti.include('database.js');
var detailWindow = Titanium.UI.currentWindow; 
	
//add favorite Button
var favButton = Titanium.UI.createButton({
	title: 'Add Favorit',
	width: 140,
	height:30,
	left: 10,
	top:10,
	added: 0
});
// check if this recipe is in favorites
if(detailWindow.id<=0)
{
	detailWindow.id = isFavorite(detailWindow._title);
	Ti.API.info('isFavorite? (' + detailWindow.id + ')');
	
}
if(detailWindow.id>0)
{
	favButton.added = 1;
	favButton.title = 'Remove Favorit';
}
	
favButton.addEventListener('click',function(e){

	if(favButton.added == 0){
		var newId = insertFavorite(detailWindow._title,detailWindow._description,detailWindow._link);
		Ti.API.info('Newly created favorite id = ' + newId);
		detailWindow.id = newId;
		alert('This recipe has been added as a favorite!');
		favButton.added = 1;
		favButton.title = 'Remove Favorit';

	}else{
		deleteFavorite(detailWindow.id);
		Ti.API.info('Deleted favorite records. (id ' + detailWindow.id + ')');
		detailWindow.id = 0;
		alert('This recipe has been remove from  your favorites!');
		favButton.added = 0;
		favButton.title = 'Add Favorit';
	}
});
	
detailWindow.add(favButton);
//end of favButton

	
//open link button
var viewLinkButton = Titanium.UI.createButton({
	title: 'View the webpage',
	right: 	10,
	top:	10,
	width: 	140,
	height:	30,
	added: 0
});
	
viewLinkButton.addEventListener('click' ,function(e){
	
	// create detail window
	var viewLinkWindow = Titanium.UI.createWindow({
		_link:detailWindow._link,
		backgroundColor:'#fff',
		url: 'viewLink.js',
		title:detailWindow._title,
		id:0
	});
	
	Titanium.UI.currentTab.open(viewLinkWindow);
});
	
detailWindow.add(viewLinkButton);
//end of linkButton
	
//full descrition label
var detailDescriptionLabel = Titanium.UI.createLabel({
	text: detailWindow._description,
	font : {fontSize: 13, fontWeight : ' normal ' },
	left: 	10,
	top: 	50,
	width: 	300,
	height: 'auto',
	color:	'#9a9'
});
	
detailWindow.add(detailDescriptionLabel);
	
	