// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');


	
Ti.App.addEventListener('pause', function() {
    Ti.API.info('App Paused');
    
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// get platform window size   
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
	width:pWidth,
  	height:pHeight,
  	top: 0,
  	left: 0,
  	backgroundImage: 'background.png',
  	url: 'recipes.js',
  	title: 'Recipes',
  	barImage: 'navbar.png',
  	exitOnClose:true
});

win1.addEventListener('android:back', function(){
   var activity = Titanium.Android.currentActivity;
   Ti.API.info('>>>>>>>>>>>>>>>>>>>>>>>>> android '+activity);
   activity.finish();
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Recieps',
    window:win1
});



//
// create controls tab and root window
//
//create the second window for settings tab
var win2 = Titanium.UI.createWindow({
  width:pWidth,
  height:pHeight,
  top: 0,
  left: 0,
  backgroundImage: 'background.png',
  url: 'favorites.js',
  title: 'Favorites',
  barImage: 'navbar.png'
});

var tab2 = Titanium.UI.createTab({  
    icon:'Img/favorites_icon.png',
    title:'Favorites',
    window:win2
});



//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  


// open tab group
tabGroup.open();
