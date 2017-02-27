//mock jQuery 3.1.1
//首先是iife导出jQuery和$

(function( global, factory) {
    //关于module.exports 和 exports, see helper.js
    //调用factory函数导出jQuery并检查window是否有document对象,没有将global传入
    'use strict';
    //commomJS 和 node 2种环境下
    if( typeof module === 'object' && typeof module.exports === 'object' ) {
        module.exports = global.document ? factory(global, true) :
            function ( w ) {
                if( !w.document ) {
                    throw new Error( 'jQuery requires a window with a document!' );
                }
                return factory( w );
            };
    }
    else {
        factory( global );
    }
    //window没定义的情况传this
})(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    "use strict";
    //事先存储好数组和对象的方法，不但写起来简洁,还能提高程序运行效率，类似缓存jQuery对象
    var arr = [];
    var document = window.document;
    var getProto = Object.getPrototypeOf;
    var slice = arr.slice;
    var concat = arr.concat;
    var push = arr.push;
    var indexOf = arr.indexOf;

    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString; //function的toString方法
    var ObjectFunctionString = fnToString.call(Object);

    var support = {};

    //执行script
    function DOMEval( code, doc ) {
        doc = doc || document;

        var script = document.createElement('script');

        script.text = code;//执行这句时候已经运行code了
        doc.head.appendChild( script ).parentNode.removeChild( script );//运行完后防止script过多 移除
    }


    var version = '3.1.1',
    jQuery = function( selector, context ) {
        return new jQuery.fn.init( selector, context );//无new就能例化
    },
    //去除前后空白字符
    rtrim = /^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$/g,
    //-ms-前缀
    rmsPrefix = /^-ms-/,
    //匹配-后面的小写字母
    rdashAlpha = /-([a-z])/g,

    //转驼峰replace每次匹配的回调函数
    fcamelCase = function( all, letter ) { //all表示所有匹配到的 如-t, letter表示()里面的 如t
        //console.log(all, letter);
        return letter.toUpperCase();
    };
    
    //初次初始化原型
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//重定义prototype的constructor属性(jQuery.fn.init)为jQuery

        length: 0,

    };





    //注册一个命名了的amd，一般匿名,但jQuery经常是其他模块的依赖.并且有名字更安全
    if ( typeof define == 'function' && define.amd ) {
        define('jquery', [], function() {
            return jQuery;
        });
    }

    //防止被覆盖，保留原来的jQuery
    var _jQuery = window.jQuery, _$ = window.$;

    jQuery.noConflict = function( deep ) {
        if( window.$ === jQuery ) {
            window.$ = _$;
        }

        if( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    //暴露jQuery和$

    if( !noGlobal ){
        window.jQuery = window.$ = jQuery;
    }


})
