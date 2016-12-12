
1.render部分

//react code review:
var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if ("development" !== 'production') {
  var ReactElementValidator = _dereq_(64);
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

/*function H2(props) {
    return (
        <h2 className={styles.h2} {...props} />
    );
}
比如要渲染：<HX.H2>simple biolerplate</HX.H2>
这里H2里的HTML可通过this.props.children取到,children是包含在<name></name>里面的东西,可以是组件也可以不是*/

var ReactElementValidator = {//render就跑这里来了,这个用来验证return中的对象?
//class就是function,碰到自定义组件时是type=function的情况
  createElement: function (type, props, children) {//type = H2(props), props = null, children = "simple biolerplate"
    var validType = typeof type === 'string' || typeof type === 'function' || type !== null && typeof type === 'object';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    "development" !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if ("development" !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            "development" !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;


//warning
'use strict';

var emptyFunction = _dereq_(157);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("development" !== 'production') {
  warning = function warning(condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };
}

module.exports = warning;


/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if ("development" !== 'production') {
      "development" !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if ("development" !== 'production') {
    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

    // Create dummy `key` and `ref` property to `props` to warn users against its use
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        "development" !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingKey.isReactWarning = true;

    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        "development" !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingRef.isReactWarning = true;

    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
      if (!props.hasOwnProperty('key')) {
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      if (!props.hasOwnProperty('ref')) {
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};


/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,//Symbol(react.element)

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if ("development" !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};
    var shadowChildren = Array.isArray(props.children) ? props.children.slice(0) : props.children;

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      Object.defineProperty(element, '_shadowChildren', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: shadowChildren
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._shadowChildren = shadowChildren;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if ("development" !== 'production') {
      "development" !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if ("development" !== 'production') {
    var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

    // Create dummy `key` and `ref` property to `props` to warn users against its use
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;
        "development" !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingKey.isReactWarning = true;

    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        "development" !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
      }
      return undefined;
    };
    warnAboutAccessingRef.isReactWarning = true;

    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
      if (!props.hasOwnProperty('key')) {
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      if (!props.hasOwnProperty('ref')) {
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if ("development" !== 'production') {
      "development" !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }

    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

ReactElement.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;

module.exports = ReactElement;



/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}



2.redux部分
/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {
  return function () {
    return function (next) {
      return function (action) {
        if (action.type !== _actions.CALL_HISTORY_METHOD) {
          return next(action);
        }

        var _action$payload = action.payload;
        var method = _action$payload.method;
        var args = _action$payload.args;

        history[method].apply(history, _toConsumableArray(args));
      };
    };
  };
}


//3.helper function

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
 var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';
var objectToString = objectProto.toString;
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}





1.质量管理单元工程填报的render部分 code-tracing:
const ProjectFill = ({

}) => 
  <div className={styles.pF}>
    <CellDetail fill={true} />
    <ThreeStepsContainer />
  </div>

export default ProjectFill;

经过一堆webpack,mainjs啥的跳过了,然后猜测是通过路由进到QualManaPrjFill组件(整个页面包括listBox和mainBox)的render里面
render(){
    let data = this.dataFormat();//执行这个会调用createPrototypeProxy.js应该是由this触发的吧?
    let tmpMainBox;
    tmpMainBox = this.props.mainBox === undefined ? (<DefaultDisplay defaultIndx={1} />) : this.props.mainBox;
    return (//进到return里面之后跳转到ReactElementValidator.js里的createElement function.
       <div>
          <div className={sideBarStyles.listBox}>
            <div>
                <SearchBar placeholder="..." onChange={this.onChange} onSearch={this.onSearch} filterType={2}/>
                <TreeView onHighLight={(data)=>this.onHighLight(data)} onAction={(data)=>this.onAction(data)} data={data} />
            </div>
          </div>
          <div className={`${mainStyles.mainBox}`}>
            {tmpMainBox}
          </div>
       </div> 
   )
}
//render从最里面开始创建React element, SearchBar-->TreeView-->div-->div ...
进入dataFormat函数
dataFormat(){
        console.log('format',this.props.loadingIndex);
        const dataSource=[{
            name: '杨房沟工程',
            icon: "folder",
            fold: "expanded",
            action: 'link',
            actionData:{linkURL:'/qualityMana/unitProjectReport/fill'},
            }
        ];
        let check = new CheckObj(),//这里进入class CheckObj
        treeData = check.check(this.props.treeData);//immutable data 进入immutableJS里面的toJS()

class CheckObj {
  constructor() {//入constructor
    
    }
mainjs
function _classCallCheck(instance, Constructor) {//instance是CheckObj,因为没有extend所以CheckObj里面只有一个prototype里面是它的函数,prototype再往上连接着Object.__proto__,constructor是function CheckObj(){}
 if (!(instance instanceof Constructor)) {//instance check
    throw new TypeError("Cannot call a class as a function"); 
  } 
}

doc:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
Try it on CodePen.

Let's recap what happens in this example:

We call ReactDOM.render() with the <Welcome name="Sara" /> element.
React calls the Welcome component with {name: 'Sara'} as the props.
Our Welcome component returns a <h1>Hello, Sara</h1> element as the result.
React DOM efficiently updates the DOM to match <h1>Hello, Sara</h1>.
Components must return a single root element. This is why we added a <div> to contain all the <Welcome /> elements.
Props are Read-Only.Such functions are called "pure" because they do not attempt to change their inputs, and always return the same result for the same inputs.


/**
 * ------------------ The Life-Cycle of a Composite Component ------------------
 *
 * - constructor: Initialization of state. The instance is now retained.
 *   - componentWillMount
 *   - render
 *   - [children's constructors]
 *     - [children's componentWillMount and render]
 *     - [children's componentDidMount]
 *     - componentDidMount
 *
 *       Update Phases:
 *       - componentWillReceiveProps (only called if parent updated)
 *       - shouldComponentUpdate
 *         - componentWillUpdate
 *           - render
 *           - [children's constructors or receive props phases]
 *         - componentDidUpdate
 *
 *     - componentWillUnmount
 *     - [children's componentWillUnmount]
 *   - [children destroyed]
 * - (destroyed): The instance is now blank, released by React and ready for GC.
 *
 * -----------------------------------------------------------------------------
 */


 class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {//propTypes是class Greeting的static memeber还是原型链往上找到React啥的?
  name: React.PropTypes.string
};


调用render(){}

render(){
  let data = this.dataFormat();
  let tmpMainBox;
  tmpMainBox = this.props.mainBox === undefined ? (<DefaultDisplay defaultIndx={1} />) : this.props.mainBox;
  return (//走到return时直接调了React
     <div>
        <div className={sideBarStyles.listBox}>
          <div>
              <SearchBar placeholder="..." onChange={this.onChange} onSearch={this.onSearch} filterType={2}/>
              <TreeView onHighLight={(data)=>this.onHighLight(data)} onAction={(data)=>this.onAction(data)} data={data} />
          </div>
        </div>
        <div className={`${mainStyles.mainBox}`}>
          {tmpMainBox}
        </div>
     </div> 
 )
}

