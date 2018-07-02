
// 返回顶部
if($(".fixed-circle").length){
	console.log($(".fixed-circle"));
	var gototop = $(".fixed-circle");
	var $docu = $(document);
	var scrollnum;
	var ismui = true;
	gototopfn=function() {
		$(window).scroll(function(){
			if($(".mui-scroll")[0].style.webkitTransform){
				var muiScroll=Number($(".mui-scroll")[0].style.webkitTransform.split(',')[1].slice(0,-2));
			}
			if(muiScroll !== 0 && $docu.scrollTop() === 0){
				scrollnum = muiScroll;
			} else {
				scrollnum = $docu.scrollTop();
			}
		})
		console.log(scrollnum);
		if(scrollnum == undefined || scrollnum == 0){
			gototop.fadeOut();
		}
		if(scrollnum > 0 ){
			ismui = false;
			if(scrollnum<65){
				console.log('隐藏');
				gototop.fadeOut();
			} else {
				console.log('显示');
				gototop.fadeIn();
			}
		} else if (scrollnum < 0){
			ismui=true;
			if (scrollnum > -65) {
				console.log('隐藏');
				gototop.fadeOut();
			} else {
				console.log('显示');
				gototop.fadeIn();
			}
		}
	};
	var gototop_timer;
	$(window).scroll(function() {
		clearTimeout(gototop_timer);
		gototop_timer = setTimeout(gototopfn, 300)
	});
	gototop.on('tap', function() {
		if(ismui){
			mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
			gototop.delay(100).fadeOut();
		} else{
			$("html,body").animate({
				scrollTop:0
			},{
				'duration':'fast',
				'complete':function(){
					gototop.delay(100).fadeOut();
				}
			});
		}
		return false;
	});
	gototopfn();
}

/**
 * cookie操作
 */
var getCookie = function(name,value,options) {
    if(typeof value != 'undefined') { // 如果给name和value，设置value
        options = options || {};
        if (value === null) {
            value = '';
            options.exprires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if(typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();//使用expires属性，IE不支持max-age
        }
        var path = options.path ? '; path=' + options.path: '';
        var domain = options.domain ? '; domain=' + options.domain: '';
        var secure = options.secure ? '; secure' : '';
        var s = [cookie, expires, path, domain, secure].join('');
        var c = [name, '=', encodeURIComponent(value)].join('');
        var cookie = [c,expires,path,domain, secure].join('');
        document.cookie = cookie;
    } else { // 只给了name，就获取cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0,name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*(function($, doc) {
	$.init();
	$.plusReady(function() {
		$.oldBack = mui.back;
		var backButtonPress = 0;
		$.back = function(event) {
			console.log('返回1');
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
}(mui, document));*/