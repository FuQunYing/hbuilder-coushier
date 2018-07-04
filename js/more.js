mui.init();

$("body").css("min-height",screen.availHeight-50);
mui('body').on('tap','.mui-bar a',function(){
	if (this.href.indexOf("#") === -1){
		document.location.href=this.href;	
	}
});

/*$("body").on('swiperight', function(){
	document.location.href="count.html";
});*/

 //初始化单页view
var viewApi = mui('#app').view({
	defaultPage: '#more'
});

//语言选择
$(".lanset").on('tap', 'li', function(e){
	console.log($(this)[0].title);
	var $that = $(e.target);
	var language=$(this)[0].title;
	$that.children('span').addClass('mui-icon mui-icon-checkmarkempty');
	$that.siblings().children('span').removeClass('mui-icon mui-icon-checkmarkempty');
	getCookie('userLanguage',language,{expires:30,path:'/'})
});

//修改信息与修改密码切换
$(".changeinfo").on('tap', function(){
	formChange(0,".pwd-form",".changepwd",".info-form",".changeinfo");
})

$(".changepwd").on('tap', function(){
	formChange(1,".pwd-form",".changepwd",".info-form",".changeinfo");
})


//商户信息页的切换
$("#titchange").on('tap','.binfo',function(e){
	formChange(0,'.cuser-form','.changeuser','.binfo-form','.binfo');
})
$("#titchange").on('tap','.changeuser',function(e){
	formChange(1,'.cuser-form','.changeuser','.binfo-form','.binfo');
})

function formChange(i,hide,hidecontrol,show,showcontrol){
	if(i == 0){
		console.log(i);
		if(!$(hide).hasClass("hide")){
			$(hide).addClass("hide");
		}
		if($(hidecontrol).hasClass("activate")){
			$(hidecontrol).removeClass("activate");
		}
		if(!$(showcontrol).hasClass("activate")){
			$(showcontrol).addClass("activate");
		}
		if($(show).hasClass("hide")){
			$(show).removeClass("hide");
		}
	}else if(i ==1 ){
		console.log(i);
		if($(hide).hasClass("hide")){
			$(hide).removeClass("hide");
		}
		if(!$(hidecontrol).hasClass("activate")){
			$(hidecontrol).addClass("activate");
		}
		if($(showcontrol).hasClass("activate")){
			$(showcontrol).removeClass("activate");
		}
		if(!$(show).hasClass("hide")){
			$(show).addClass("hide");
		}
	}
}

//收银点编辑弹出框
function cashEdit(){
	var mask=mui.createMask(function(){
		$("#editdevice").fadeOut();
		$('body').css('overflow','auto');
	});
	$("#openedit").on('tap',function(){
		$("#editdevice").fadeIn();
		$('body').css('overflow','hidden');
		mask.show();
	})
	$(".closeedit").on('tap',function(){
		$("#editdevice").fadeOut();
		$('body').css('overflow','auto');
		mask.close();
	})
	$(".manual").on('tap',function() {
		if(!$(".regular").hasClass('hide')){
			$(".regular").addClass('hide');
		}
	})
	$(".fixed").on('tap',function(){
		if($(".regular").hasClass('hide')){
			$(".regular").removeClass('hide');
		}
	})
}
cashEdit();

//增加操作人员
function addUsers(){
	var mask=mui.createMask(function(){
		$("#editcashier").fadeOut();
		$('body').css('overflow','auto');
	})
	$('.addbtn').on('tap',function(){
		$("#editcashier").fadeIn();
		mask.show();
	})
	$(".closeedit").on('tap',function(){
		$("#editcashier").fadeOut();
		$('body').css('overflow','auto');
		mask.close();
	})
}
addUsers();

//查看产品
function checkpds(){
	var mask=mui.createMask(function(){
		$("#check").fadeOut();
		$("body").css('overflow','auto');
	})
	$("#checkbtn").on('tap',function(){
		$("#check").fadeIn();
		mask.show();
	})
	$(".closeedit").on('tap',function(){
		$("#check").fadeOut();
		$('body').css('overflow','auto');
		mask.close();
	})
}
checkpds();

 //退出操作******************
 $("#exit").on('tap', function() {
	mui.confirm("是否退出登录？",'',['取消','确定'], function(e) {
		if(e.index === 1) {
			window.localStorage.clear();
			mui.toast('您已退出登录');
			location.href="login.html";
		} else if (e.index === 0) {
			console.log('取消退出');
		}
	}, 'div')
});

var view = viewApi.view;
(function($) {
	//处理view的后退与webview后退
	var oldBack = $.back;
	$.back = function() {
		if (viewApi.canBack()) { //如果view可以后退，则执行view的后退
			viewApi.back();
		} else { //执行webview后退
			oldBack();
		}
	};
	//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
	//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
	view.addEventListener('pageBeforeShow', function(e) {
		//				console.log(e.detail.page.id + ' beforeShow');
	});
	view.addEventListener('pageShow', function(e) {
		//进入手执设定界面时
		if (e.detail.page.id == 'lock') {
			var settings = app.getSettings();
			/*if (!settings.autoLogin) {
				plus.nativeUI.toast('当前没有启用 “自动登录”，需要在登录时启用 "自动登录"，设定的手势锁屏才会升效。');
			}*/
			var lockStateButton = document.getElementById("lockState");
			var locker = document.querySelector('.mui-locker');
			lockStateButton.classList[settings.gestures ? 'add' : 'remove']('mui-active')
			locker.style.display = settings.gestures ? 'block' : 'none';
		}
		//				console.log(e.detail.page.id + ' show');
	});
	view.addEventListener('pageBeforeBack', function(e) {
		//				console.log(e.detail.page.id + ' beforeBack');
	});
	view.addEventListener('pageBack', function(e) {
		//				console.log(e.detail.page.id + ' back');
	});
})(mui);