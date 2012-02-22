/**
 * @author Chia-Yuan Hsiung
 */
Ti.include('database.js');
var detailWindow = Titanium.UI.currentWindow; 

//add favorite Button
var favButton = Titanium.UI.createButton({
	title: 'Add Favorit',
	left: 10,
	top:10,
	widht: 140,
	height:30,
	added: 0
});
	
favButton.addEventListener('click',function(e){

	if(favButton.added == 0){
		var newId = insertFavorite(detailWindow.title,detailWindow.description,detailWindow.link);
		Ti.API.info('Newly created favorite id = ' + newId);
		detailWindow.id = newId;
		alert('This recipe has been added as a favorite!');
		favButton.added = 1;
		favButton.title = 'Remove Favorit';

	}else{
		deleteFavorite(detailWindow.id);
		Ti.API.info('Deleted ' + affectedRows +' favorite records. (id ' + detailWindow.id + ')');
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
	title: 'View InSafari',
	right: 10,
	top:10,
	widht: 140,
	height:30,
	added: 0
});
	
viewLinkButton.addEventListener('click' ,function(e){
	Ti.Platform.openURL(detailWindow.link);
});
	
detailWindow.add(viewLinkButton);
//end of linkButton
	
//full descrition label
var detailDescriptionLabel = Titanium.UI.createLabel({
	text: detailWindow.description,
	font : {fontSize: 12, fontWeight : ' normal ' },
	left: 	10,
	top: 	50,
	width: 	300,
	height: 'auto',
	color:	'#9c9'
});
	
detailWindow.add(detailDescriptionLabel);
	
	