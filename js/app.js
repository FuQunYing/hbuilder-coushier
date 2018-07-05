
// 返回顶部
if($(".fixed-circle").length){
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
		if(scrollnum == undefined || scrollnum == 0){
			gototop.fadeOut();
		}
		if(scrollnum > 0 ){
			ismui = false;
			if(scrollnum<65){
				gototop.fadeOut();
			} else {
				gototop.fadeIn();
			}
		} else if (scrollnum < 0){
			ismui=true;
			if (scrollnum > -65) {
				gototop.fadeOut();
			} else {
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

//设置cookie
  function setCookie(name, vaule, time) {
    const d = new Date();
    d.setTime(d.getTime() + (time * 365 * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + vaule + '; ' + expires;
    console.log(document.cookie)
  }

//获取cookie
  function getCookie(name) {
    const n = name + '=';
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(n) === 0) {
        return c.substring(n.length, c.length);
      }
    }
    return '';
  }
 //设置storage
 function setStorage(name,value){
 	localStorage.setItem(name,value);
 }
 //获取storage
 function getStorage(name){
 	return localStorage.getItem(name);
 }