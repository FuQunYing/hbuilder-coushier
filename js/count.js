mui.init();
console.log(2);
$("body").css("min-height",screen.availHeight-50);
mui('body').on('tap','.mui-bar a',function(){
	if (this.href.indexOf("#") === -1){
		console.log(1);
		document.location.href=this.href;	
	}
});
/*$("body").on('swipeleft', function(){
	document.location.href="more.html";
});
$("body").on('swiperight', function(){
	document.location.href="notify.html";
});*/
(function($, doc) {
	$.init();
	var settings = app.getSettings();
	var account = doc.getElementById('account');
	//
	window.addEventListener('show', function() {
		var state = app.getState();
		account.innerText = state.account;
	}, false);
	$.plusReady(function() {
		var settingPage = $.preload({
			"id": 'setting',
			"url": 'setting.html'
		});
		$.oldBack = mui.back;
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
}(mui, document));