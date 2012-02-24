/**
 * @author Chia-Yuan Hsiung
 */

var win = Titanium.UI.currentWindow;
//add a webview 
var webview = Titanium.UI.createWebView({
	width: 320,
	height: 367, 
	top: 0,
	url: win._link
}); 
win.add(webview);