mui.init();
$("body").css("min-height",screen.availHeight-50);
mui('body').on('tap','.mui-bar a',function(){
	if (this.href.indexOf("#") === -1){
		console.log(1);
		document.location.href=this.href;	
	}
});
 //初始化单页view
var viewApi = mui('#countmain').view({
	defaultPage: '#count'
});
var oldBack=mui.back;
mui.back=function(){
	if(viewApi.canBack()){
		if($(".title").parent().hasClass('mui-active')){
			$(".title").parent().removeClass('mui-active');
		}
		viewApi.back();
	} else {
		oldBack();
	}
}
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
//日期
$(".time").focus(function() {
	var start=$(this);
	start.prop('type','date');
	setTimeout(function(){start.trigger('click');},10)
});
$(".time").blur(function() {
	var obj=$(this);
	if(!obj.val()){
		obj.prop('type','text');
	}
});
/*$("body").on('swipeleft', function(){
	document.location.href="more.html";
});
$("body").on('swiperight', function(){
	document.location.href="notify.html";
});*/
