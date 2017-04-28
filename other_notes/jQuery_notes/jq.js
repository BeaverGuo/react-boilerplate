jQuery version 1.6

07-event.js






jquery 1.10.2
// 压缩策略
// w -> windwow , u -> undefined
(function(w, u) {
 
})(window);//因为实参是不能被压缩的,所以减少它是利于压缩的策略


// The ready event handler
completed = function(event) {
    // readyState === "complete" is good enough for us to call the dom ready in oldIE
    if (document.addEventListener || event.type === "load" || document.readyState === "complete") {
        detach();
        jQuery.ready();
    }
},

//document.readyState == 'complete'这个可以判断DOM加载情况?

//mdn:当document文档正在加载时,返回"loading"。当文档结束渲染但在加载内嵌资源时，返回"interactive"，并引发DOMContentLoaded事件。当文档加载完成时,返回"complete"，并引发load事件。readystatechange事件会在document对象上的readyState属性的属性值发生变化时触发.

isWindow: function(obj) {
    /* jshint eqeqeq: false */
    return obj != null && obj == obj.window;
},

isNumeric: function(obj) {//Infinity表示无限,-Infinity
    return !isNaN(parseFloat(obj)) && isFinite(obj);
},

// typeof 并不能区分出它是 Array 、RegExp 等 object 类型，jQuery 为了扩展 typeof 的表达力，因此有了 $.type 方法
// 针对一些特殊的对象（例如 null，Array，RegExp）也进行精准的类型判断
// 运用了钩子机制，判断类型前，将常见类型打表，先存于一个 Hash 表 class2type 里边
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
});

// 确定JavaScript 对象的类型
// 这个方法的关键之处在于 class2type[core_toString.call(obj)]
// 可以使得 typeof obj 为 "object" 类型的得到更进一步的精确判断
type: function(obj) {
    // 如果传入的为 null --> $.type(null)
    // "null"
    if (obj == null) {
        return String(obj);
    }
    // 利用事先存好的 hash 表 class2type 作精准判断
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[core_toString.call(obj)] || "object" :
        typeof obj;
},


// 检查对象是否为空（不包含任何属性）,Object.keys与之的区别是Object.keys只返回可枚举属性并且不找prototype
isEmptyObject: function(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
},

// 为 JavaScript 的 "error" 事件绑定一个处理函数
error: function(msg) {
    throw new Error(msg);
},

//RegExp.prototype.exec()返回的数组[0]是匹配到的整个string后面的[1]开始是小括号里面捕获的lastIndex是开始下一次匹配的索引


//match
if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
    // Assume that strings that start and end with <> are HTML and skip the regex check
    // 如果selector是html标签组成的话，match的组成直接如下
    // match[1] = selecetor 即匹配的是 (<[\w\W]+>)
    match = [null, selector, null];

    // 并非是以  "<"开始，">"结尾
} else {
    // 使用 exec 处理 selector ，得到数组match
    // rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/ 简单的检测 HTML 字符串的表达式
    match = rquickExpr.exec(selector);
}

匹配<> 和 #id
rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/

classCache = createCache(),//这个闭包用得好

// 创建一个 key-value 格式的缓存
function createCache() {
    // 用来保存已经存储过的 key-value，这是一种闭包
    var keys = [];

    // 这里使用cache这个函数本身来当作存放数据的对象
    function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        // key 后面加空格是为了避免覆盖原生属性 
        // 当缓存栈超过长度限制时，则需要删除以前的缓存（后进先出，从栈底删除）
        if (keys.push(key += " ") > Expr.cacheLength) {
            // Only keep the most recent entries
            delete cache[keys.shift()];
        }
        // 返回存储好的信息
        return (cache[key] = value);
    }
    return cache;
}


//Sizzle 引擎
// 保存复用的 document 变量，提高效率
preferredDoc = window.document,

document.ownerDocument === null

// nodeType 属性返回被选节点的节点类型
// nodeType 各个数字所代表的含义 http://www.w3school.com.cn/xmldom/prop_element_nodetype.asp
// 1 -- Element
// 9 -- Document
// 如果上下文传入错误，返回空数组
if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
    return [];
}

// 不存在 seed 集合
// seed - 种子合集（搜索器搜到符合条件的标签）
if (documentIsHTML && !seed) {// documentIsHTML ?

    // Shortcuts
    // 快速匹配，如果是 id 、tag 或者 class 选择器
    // rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/
    if ((match = rquickExpr.exec(selector))) {
        // Speed-up: Sizzle("#ID")
        // selector会匹配 #[id] | [tag] | .[class] 其中之一
        // match[1] 的值是元素是与 rquickExpr 的第 1 个子表达式相匹配的文本，
        // 在这里 match[1] 就是匹配到的 id 选择器的名字（如果有）
        // 如果匹配到 id 选择器 #xx
        if ((m = match[1])) {//id
            // 9 -- Document
            // 如果上下文是 document 因为要用到context所以要进行合法性判断
            if (nodeType === 9) {
                // 利用原生方法 document.getElementById 匹配到的 elem   id速度快
                elem = context.getElementById(m);
                // Check parentNode to catch when Blackberry 4.6 returns
                // nodes that are no longer in the document #6963
                if (elem && elem.parentNode) {
                    // Handle the case where IE, Opera, and Webkit return items
                    // by name instead of ID
                    if (elem.id === m) { //这边还做了一次校验
                        results.push(elem);
                        return results;
                    }
                } else {
                    // 返回结果
                    return results;
                }
            } else {
                // Context is not a document
                // 上下文不是 document 取ownerDocument尝试 contains(context, elem)相当于设置context为document，是通过递归来向上找ownerDocument直到找到document为止吗?
                if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                    contains(context, elem) && elem.id === m) {
                    results.push(elem);
                    return results;
                }
            }

            // Speed-up: Sizzle("TAG")
            // 在这里 match[2] 就是匹配到的 tag 选择器的名字（如果有）
            // 如果匹配到 tag 选择器 诸如div p 等
        }
        else if (match[2]) { //tag
            // 利用原生方法 getElementsByTagName 找到元素
            push.apply(results, context.getElementsByTagName(selector));
            return results;

            // Speed-up: Sizzle(".CLASS")
            // 在这里 match[3] 就是匹配到的 class 选择器的名字（如果有）
            // 如果匹配到 class 选择器 .xxx
            // 并且
            // support.getElementsByClassName 为 true 表示浏览器支持 getElementsByClassName 这个方法
        } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
        }
    }


    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    // 使用 assert(function(div){}) 函数进程浏览器 bug 测试
    // assert 函数建立一个 div 节点，将这个 div 节点传递给回调函数
    // div 节点在 assert 函数结束时会被删除，此时注意要删除由回调函数创建的子节点，并将 div 赋值 null 以让 GC 回收。
    function assert(fn) {
        // 创建测试用节点
        var div = document.createElement("div");

        try {
            // 转换fn的返回值为boolean值
            // fn(div) -- assert(function(div){}) 这里的 div 就是上面创建的测试节点
            return !!fn(div);
        } catch (e) {
            return false;
            // 结束时移除这个节点
        } finally {
            // Remove from its parent by default
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
            // release memory in IE
            // 在 IE 里释放内存  好
            div = null;
        }
    }

/*以下代码输出
hi from a!
hi from b!
7007
setTimeout 1!
setTimeout 2!
*/

function a() { 
    return new Promise(function (resolve, reject) {
        console.log("hi from a!");
        resolve("hi from a!");
    });
}

function b() { 
    return new Promise(function (resolve, reject) { 
        a().then(function(){
            console.log("hi from b!");
            resolve("hi from b!");
        })
    });
}

setTimeout(function () { 
    console.log("setTimeout 1!");
});

b();

setTimeout(function () { 
    console.log("setTimeout 2!");
});

//我们一般的click事件也运用了闭包


<!-- START Display Upgrade Message for IE 10 or Less -->
<!-- [if lte IE 9]>
<div style="background: #000; text-align: center; position: absolute; top: 0px; width: 100%; color: #FFF;">This website may not be compatible with your outdated Internet Explorer version. <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank" style="color: #fff; text-decoration: underline;">Please upgrade here.</a></div>
<![endif]-->
<script>
// IF THE BROWSER IS INTERNET EXPLORER 10
if (navigator.appVersion.indexOf("MSIE 10") !== -1)
{
document.write('<div style="background: #000; text-align: center; position: absolute; top: 0px; width: 100%; color: #FFF;">\
    This website may not be compatible with your outdated Internet Explorer version. <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank" style="color: #fff; text-decoration: underline;">Please upgrade here.</a></div>');
}
// ]]></script>
<!-- END Display Upgrade Message for IE 10 or Less -->





//ie9以下浏览器提示
(function(){
  var innerStyle = function(styleText){
      var styleDom = document.createElement('style');
          styleDom.type = 'text/css'
      if( styleDom.styleSheet ){ //ie
        styleDom.styleSheet.cssText = styleText;
      }else{
        styleDom.innerText = styleText;
      }
      document.getElementsByTagName('head')[0].appendChild(styleDom);
  }

  var domReady = function(fn) {
    var done = false, top = true,
    doc = window.document,
    root = doc.documentElement,  //html root
    modern = doc.addEventListener,
    add = modern ? 'addEventListener' : 'attachEvent',
    rem = modern ? 'removeEventListener' : 'detachEvent',
    pre = modern ? '' : 'on',
    init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return; //complete内嵌资源也加载完了
        (e.type == 'load' ? window : doc)[rem](pre + e.type, init, false); //全加载完后移除事件绑定释放资源
        if (!done && (done = true)) fn.call(window, e.type || e); //加载完set index done, call callback function
    },
    poll = function() { //利用 doScroll这个特性 去检测 domReady是否完成?是不是没完成就进catch执行出错了?
        //check to see if the callbacks have been fired already
        try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
        //there were no errors with the scroll check and the callbacks have not yet fired, so fire them now
        init('poll'); //这个poll没看懂
    };
    if (doc.readyState == 'complete') fn.call(window, 'lazy');
    else {
        if (!modern && root.doScroll) {
            try { top = !window.frameElement; } catch(e) { } //顶层窗口window.frameElement返回null
            if (top) poll();
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        window[add](pre + 'load', init, false);
    }
  }

  var ltie9 = !!(document.all && !document.addEventListener)
  var styles = '.explorer-tips { position: relative; padding: 8px 20px 10px 48px; color: #666; font-size: 14px; background: #FFEED2; font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, "PingFang SC","Hiragino Sans GB","Lantinghei SC","Microsoft YaHei",sans-serif; } .explorer-tips strong { color: #FF9C2D; font-size: 16px; font-weight: bold; } .explorer-tips a { color: #4394FF; border-bottom: 1px solid #4394FF; } .explorer-tips a:hover { text-decoration: none; } .icon-remind { position: absolute; left: 24px; top: 11px; width: 16px; height: 18px; background: url(http://pic.c-ctrip.com/flight/index/icons/icon_remind.png) no-repeat 0 0; } /* mask */ .explorer-mask {z-index: 100; position: fixed; left: 0; top: 0; right: 0; bottom: 0; filter:progid:DXImageTransform.Microsoft.gradient(enabled="true",startColorstr="#B2000000", endColorstr="#B2000000");background:rgba(0,0,0,0.7); } /* explorer-modal */ .explorer-modal, .explorer-modal h3, .explorer-modal h4 { font-weight: normal; font-family: BlinkMacSystemFont, Helvetica, Arial, Tahoma, "PingFang SC","Hiragino Sans GB","Lantinghei SC","Microsoft YaHei",sans-serif; } .explorer-modal h2, .explorer-modal .close { overflow: hidden; line-height: 999em; } .explorer-modal { z-index: 101; position: fixed; left: 50%; top: 50%; margin: -234px 0 0 -272px; width: 543px; height: 468px; background: url(http://pic.c-ctrip.com/flight/index/explorer_modal.png) no-repeat 0 0; } .explorer-modal .modal-header { height: 150px; } .explorer-modal h3 { text-align: center; color: #999; font-size: 16px; font-weight: normal; border-top: 1px solid #e7e7e7; } .explorer-modal h3 span { position: relative; top: -10px; padding: 0 20px; background: #fff; } .explorer-modal .modal-body { padding: 42px 30px 0; height: 224px; } .explorer-modal .QR-code { display: inline-block; /*_display: inline; _zoom: 1;*/ width: 132px; margin: 10px 20px 0 60px; text-align: center; color: #999; } .explorer-modal h4 { margin-top: 5px; } .explorer-modal .modal-bottom { height: 52px; line-height: 52px; color: #666; font-size: 14px; text-align: center; } .explorer-modal .link { margin-left: 15px; color: #4394FF; border-bottom: 1px solid #4394FF; } .explorer-modal .link:hover { text-decoration: none; } .explorer-modal .close { position: absolute; top: 16px; right: 16px; width: 30px; height: 30px; cursor: pointer; }'
  var tipstop = '<div class="explorer-tips"> <i class="icon-remind"></i> 您当前的浏览器版本过低，可能有<strong>安全风险</strong>，您可以手机下载APP或升级浏览器，<a href="javascript:;">查看详情</a></div>'
  var modals = '<div class="explorer-mask"></div>\
                <div class="explorer-modal">\
                    <div class="modal-header"><h2>您当前的浏览器版本过低，可能有<span>安全风险！</span></h2></div>\
                    <div class="modal-body">\
                        <h3><span>您可以手机扫码搜索机票</span></h3>\
                        <div class="QR-box">\
                            <div class="QR-code"><img src="http://pic.c-ctrip.com/flight/index/QR_h5.png" alt=""><h4>手机网页版</h4></div>\
                            <div class="QR-code"><img src="http://pic.c-ctrip.com/flight/index/QR_app.png" alt=""><h4>携程旅行APP</h4></div>\
                        </div>\
                    </div>\
                    <div class="modal-bottom">或升级浏览器<a href="https://www.google.com/chrome/browser/desktop/" class="link" target="_blank">谷歌浏览器</a><a href="http://www.firefox.com.cn/" class="link" target="_blank">火狐浏览器</a></div>\
                    <div class="close">×</div>\
              </div>'

  domReady(function(){
    if(ltie9){
      innerStyle(styles);
      document.body.insertAdjacentHTML('afterbegin', tipstop);
      document.body.insertAdjacentHTML('beforeend', modals);
      var toggleModal = function(toggle){
        var toggleEle = toggle?'show':'hide'
        cQuery('.explorer-mask')[toggleEle](); cQuery('.explorer-modal')[toggleEle]()
      }
      cQuery('.explorer-tips a').bind('click', function(){ toggleModal(1) })
      cQuery('.explorer-modal .close').bind('click', function(){ toggleModal(0) })
    }
  })
})()

/*
IE: Parse the index page -> Resolve iframe page -> Trigger the DOMContentLoaded event of the iframe ->
Trigger the iframe page onload event -> Trigger the DOMContentLoaded event of the Index page -> Trigger the
index page Of the onload event.

-> Trigger the DOMContentLoaded event of the page -> Trigger the iframe’s onload event -> Trigger the 
iframe’s onload event -> Trigger the iframe’s onload event – > The onload event for the index page.

From this process, we can see IE, you must wait for the current page iframe load analysis is completed, the
 current page to load analysis is completed, and in non-IE, iframe loading and parsing of the current page to
  make more asynchronous implementation .
*/

//dom ready function
(function(win){

  'use strict';

  var document = win.document,
    readList = [],    //  Function stack that is waiting to be executed 
    flag = false;

  var removeEvent = function(){

    if(document.addEventListenner){
      window.removeEventListenner('load',handle,false);
    }else if(document.attachEvent){
      window.detachEvent('onload',handle)
      document.detachEvent('onreadystatechange',readyState);
    }else{
      window.onload = null;
    }

  },
  handle = function(){

    if(!flag){
      
      while(readList.length){  
        readList[0].call();  // Executive function 
        readList.shift();  // Delete the first array element 
      }
      flag = true;
      removeEvent();
    }

  },
  readyState = function(){
    if(document.readyState == 'complete'){
      handle();
    }  
  },
  DOMContentloaded=function(){

    if(document.readyState == 'complete'){
      setTimeout(handle);  // setTimeout  Will use the shortest time ， The time is not the same as different systems 。
    }else if(document.addEventListenner){
      document.addEventListenner('DOMContentLoaded',fn,false);
      window.addEventListenner('load',handle,false);
    }else if(document.attachEvent){
      window.attachEvent('onload',handle);
      document.attachEvent('onreadystatechange',readyState);  //onreadystatechange  The event is contained in the page iframe At the time of ， It will wait iframe Load will trigger 。
      
      if(self === self.top){  //  When the page is not in iframe In this way detection doScroll Method is available 。 If again iframe In the use of onreadstatechange Events to judge 。
        (function(){
          try{
            document.documentElement.doScroll('left');
          }catch(e){
            setTimeout(arguments.callee,50);  //arguments.callee  Is a reference to the current function 。
            return ;
          }
          handle();
        }());
      }

    }else{
      window.onload = handle;
    }
  },
  ready = function(fn){
    readList.push(fn);  //  Add in the stack to be processed 。
    DOMContentloaded();
  };

  win.domReady = ready;


}(window));


// If IE and not a frame
            // continually check to see if the document is ready
            var top = false;

            try {
                top = window.frameElement == null && document.documentElement;
            } catch ( e ) {}

            if ( top && top.doScroll ) {
                (function doScrollCheck() {
                    if ( !jQuery.isReady ) {

                        try {
                            // Use the trick by Diego Perini
                            // http://javascript.nwbox.com/IEContentLoaded/
                            // throws errors until after ondocumentready
                            top.doScroll("left");
                        } catch ( e ) {
                            return setTimeout( doScrollCheck, 50 );
                        }

                        // detach all dom ready events
                        detach();

                        // and execute any waiting functions
                        jQuery.ready();
                    }
                })();
            }



//mixin

var regs = {
    //判断是日期 (yyyy-mm-dd)的格式
    isDate: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    //判断是时间 (yyyy-mm-dd h:m:s.ms)的格式
    isDateTime: /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})(\.\d+)?$/,
    toDate: /^(\d{4})-(\d{1,2})-(\d{1,2})( \d{1,2}:\d{1,2}:\d{1,2}(\.\d+)?)?$/,
    toDateTime: /^(\d{4})-(\d{1,2})-(\d{1,2})( (\d{1,2}):(\d{1,2}):(\d{1,2})(\.\d+)?)?$/,
    toFormatString: /([yMdhmsS])\1*/g  //\1*表示重复第一个捕获组多次
};
cFly.mix(Date.prototype, {

/**
 * @method toFormatString
 * 生成需要的格式的日期字符串
 * @param {string} 格式　例如(yyyy-mm-dd)
 * @return {string} 返回特定格式的日期字符串
 */
toFormatString: function(fmt) {
    var h = {
        'y': this.getFullYear(),
        'M': this.getMonth() + 1,
        'd': this.getDate(),
        'h': this.getHours(),
        'm': this.getMinutes(),
        's': this.getSeconds(),
        'S': this.getMilliseconds()
    };
    var minL = { 'y': 2 };
    for (var name in h) {
        if (h.hasOwnProperty(name) && !(name in minL))
            minL[name] = h[name].toString().length;
    }
    return fmt.replace(regs.toFormatString, function(a, b) {
        var t = h[b];
        var l = Math.max(a.length, minL[b]);//匹配到的和h中取到的取最大长度,不够用join的方式补0
        var arr = [];
        arr[l] = '';
        return (arr.join("0") + t).slice(-l);
    });
}

}



/**
 * 获取正在执行代码的script标签
 * @returns {*|{ID, TAG, NAME, CLASS}}
 */
function getInteractiveScript() {
    return cFly.util.find(getScripts(), function(el) {
        return el.readystate === "interactive";
    });
}

/**
 * 枚举对象属性
 * @param {Object} obj 待遍历的对象
 * @param {Function} func 调用函数，return true将跳出循环
 * @param context func执行上下文，不指定，默认为value
 */
eachProp: function(obj, func, context) {
    if (!obj) {
        return;
    }
    for (var key in obj) {
        if (hasProp(obj, key)) {
            if (func.call(context || obj[key], obj[key], key)) {
                break; //return true跳出
            }
        }
    }
},


/**
 * 删除前后字符串
 * @param value 要trim的字符串
 * @param chars 去除前后字符串
 */
function _trim(value, chars) {
    var reg = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    if (chars != null) {
        chars = chars.replace(/[\.\*\?\+\\\[\]\(\)\^\$\|]/g, function($0) {
            var ret = '';
            for (var i = 0, len = $0.length; i < len; i++) {
                ret += "\\" + $0[i];
            }
            return ret;
        });
        reg = new RegExp('^(' + chars + ')+|(' + chars + ')+$', 'g');
    }
    return value == null ? "" : (value + "").replace(reg, "");
}