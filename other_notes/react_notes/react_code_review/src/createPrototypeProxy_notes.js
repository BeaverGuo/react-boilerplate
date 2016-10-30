/*when calling this.method in class

  /**
   * Creates a proxied method that calls the current version, whenever available.
   * param:name is function name
   */
  function proxyMethod(name) {
    // Wrap to always call the current version
    var proxiedMethod = function proxiedMethod() {
      if (typeof current[name] === 'function') {
        return current[name].apply(this, arguments);
      }
    };

    // Copy properties of the original function, if any
    (0, _assign2.default)(proxiedMethod, current[name]);
    proxiedMethod.toString = proxyToString(name);

    return proxiedMethod;
  }
/*constructor如果一直有extends会从最里面那层constructor开始执行
class WorkPackages extends GeneralObject {
    constructor() {
        super();
        this.path = 'workpackages/';//执行完GeneralObject constructor之后执行这行时会调用GeneralObject的set
        this.querystr = '';
    }
}

class GenralBObject {
    constructor() {
        this._path = '';
        this._querystr = '';
        this._defaultall = '&all=true';
    }

    get path() {
        return this._path;
    }

    set path(value) {//这里将this._path设置为"workpackages/"
        this._path = value;
    }
}