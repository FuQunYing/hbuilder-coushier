/*
* 获取浏览器语言类型
* @ return {string} 浏览器国家语言
*/
/*var getNavLanguage = function(){
    if (navigator.appName == 'Netscape') {
        var navLanguage = navigator.language;
        console.log(navLanguage);
        return navLanguage.substr(0,2);
    }
    return false;
};*/
//设置默认语言类型为中文
var i18nLanguage = "zh-CN";
//设置网站支持的语言种类
var webLanguage = ['zh-CN', 'zh-TW', 'en'];
/**
 * 执行页面i18n方法
 */
var execI18n = function(){
    //获取资源文件名
    var optionFile = $("#i18n_pagename");
    if (optionFile.length < 1) {
        console.log("未找到页面元素名称,请在页面写入\n <meta id=\"i18n_pagename\" content=\"页面名(对应语言包的语言文件名)\">");
        return false;
    }
    var sourceName = optionFile.attr('content');
    sourceName = sourceName.split('-');
    //首先获取用户浏览器设备之前选择过的语言类型
    if (getStorage('userLanguage')) {
        i18nLanguage = getStorage('userLanguage');
    } else {
    	setStorage('userLanguage',i18nLanguage);
        /*//获取浏览器语言
        var navLanguage = getNavLanguage();
        if (navLanguage) {
            //判断是否在网站支持的语言数组里
            console.log(navLanguage)
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                //存到缓存中
                setStorage('userLanguage', navLanguage)
                console.log(navLanguage);
            }
        } else {
            console.log('not navigator');
            return false;
        }*/
    }
    //需要引入i18n文件
    if($.i18n == undefined) {
        console.log('未引入i18n文件');
        return false;
    }
    //这里进行i18n的翻译
    jQuery.i18n.properties({
        name: sourceName, //资源文件名称
        path: 'i18n/'+i18nLanguage+'/',//资源文件路径
        mode: 'map', //用Map的方式使用资源文件中的值
        language: i18nLanguage,
        callback: function(){//加载成功后设置显示内容
            var insertEle=$(".i18n");
//          console.log('i18n写入中',insertEle);
            insertEle.each(function() {
                //根据i18n元素的name获取内容写入
//              console.log($(this));
                $(this).html($.i18n.prop($(this).attr('name')));
            });
//          console.log('写入完毕');
//          console.log('i18n-input写入中');
            var insertInputEle = $('.i18n-input');
            insertInputEle.each(function() {
                var selectAttr=$(this).attr('selectorattr');
                if(!selectAttr) {
                    selectAttr = 'placeholder';
                }
                $(this).attr(selectAttr,$.i18n.prop($(this).attr('selectname')))
            })
//          console.log('input写入完毕');
        }
    })
};
execI18n();
