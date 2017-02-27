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
    //简化一些数组和对象方法的名字
    var arr = [];
    var document = window.document,
        getProto = Object.getPrototypeOf(),
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString,
        ObjectFunctionString = fnToString.call(Object),
        support = {};






    var version = '3.1.1';
    jQuery = function( selector, context ) {
        return new jQuery.fn.init( selector, context );//无new就能例化
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
