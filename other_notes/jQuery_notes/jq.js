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
