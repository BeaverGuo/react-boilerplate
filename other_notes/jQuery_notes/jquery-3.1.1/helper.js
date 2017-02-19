//module.exports 和 exports
//require接收一个js文件路径，将对应的模块的方法添加到module.exports对象中再返回这个对象
var exports = module.exports = {};
function require(...) {//require只能看到module.exports看不到exports后者只是对前者的引用
    ((module, exports) => {
        exports = some_func;//这里重写之后exports没有关联到module.exports,所以导不出去的

        module.exports = some_func;//但这里不是将some_func放到module.exports对象中吗？

    })(module, module.exports);

    return module;//这里还是不太懂,这样就导出模块了?
}

//在模块内部exports是作为module.exports的引用,即指针,当执行exports = some_func时改变了指针指向，所以会经常看到
exports = module.exports = some_func;
//当module.exports指向some_func时改变了指针指向，这时需要重新将exports指向module.exports



