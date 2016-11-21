/*code trace*/
app.js is application entry:
const initialState = {};
const store = configureStore(initialState, browserHistory);//browserHistory from react-router
when call a function,jump into webpack
for(var name in __webpack_require__) {//name is 'i'
  if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
    Object.defineProperty(fn, name, (function(name) {
      return {
        configurable: true,
        enumerable: true,
        get: function() {
          return __webpack_require__[name];//return module by moduleId
        },
        set: function(value) {
          __webpack_require__[name] = value;
        }
      };
    }(name)));
  }
}
//__webpack_require__
// The module cache
  var installedModules = {};
// The require function
function __webpack_require__(moduleId) {

  // Check if module is in cache
  if(installedModules[moduleId])
    return installedModules[moduleId].exports;

  // Create a new module (and put it into the cache)
  var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {},
    hot: hotCreateModule(moduleId),
    parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
    children: []
  };

  // Execute the module function
  modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

  // Flag the module as loaded
  module.l = true;

  // Return the exports of the module
  return module.exports;
}

// identity function for calling harmory imports with the correct context
  __webpack_require__.i = function(value) { return value; };//value is function configureStore()


//real configstore function
/*
 * Store
 *
 * Redux 应用只有一个单一的 store。
 * 将多个 reducer 合并成为之后传入到 createStore() 当中。
 *
 */

import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux';
import { 
  fromJS 
} from 'immutable';
import { 
  routerMiddleware 
} from 'react-router-redux';
import createReducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

//pass state and browserHistory and get store back
export default function configureStore(initialState = {}, history) {
  const middlewares = [
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
  ];

  // 创建 Redux store 来存放应用的状态。
  // createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
  // compose 从右到左来组合多个函数。
  const store = createStore(
    createReducer(),
    fromJS(initialState),//go to immutable.js file
    compose(...enhancers)
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}

//middleware.js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = routerMiddleware;

var _actions = require('./actions');

function _toConsumableArray(arr) {
 if (Array.isArray(arr)) {
  for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
   arr2[i] = arr[i]; } //Array(arr.length)
    return arr2; 
  } 
  else {
   return Array.from(arr); //Array.from() method creates a new Array instance from an array-like or iterable object.
 } 
}

/**
 * This middleware captures CALL_HISTORY_METHOD actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
function routerMiddleware(history) {//[2] global closure
  return function () {//middleware is 3-layer closure, [0] routerMiddleware with history variable
    return function (next) {
      return function (action) {//[1] anonymous function with action and _toConsumableArray
        if (action.type !== _actions.CALL_HISTORY_METHOD) {//prevent history to reach reducer?
          return next(action);
        }

        var _action$payload = action.payload;
        var method = _action$payload.method;
        var args = _action$payload.args;

        history[method].apply(history, _toConsumableArray(args));//apply receive array? call history's action.payload.method
      };
    };
  };
}

//applyMiddleware.js
'use strict';
exports.__esModule = true;
var _extends = Object.assign || function(target) {//Object.assign is shallow copy
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
;
exports["default"] = applyMiddleware;
var _compose = require('./compose');
var _compose2 = _interopRequireDefault(_compose);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }
    return function(createStore) {//[0] closure applyMiddleware with middlewares
        return function(reducer, initialState, enhancer) {//[1] closure _compose2 and _extends with middlewares
            var store = createStore(reducer, initialState, enhancer);
            var _dispatch = store.dispatch;
            var chain = [];
            var middlewareAPI = {
                getState: store.getState,
                dispatch: function dispatch(action) {
                    return _dispatch(action);
                }
            };
            chain = middlewares.map(function(middleware) {
                return middleware(middlewareAPI);
            });
            _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
            return _extends({}, store, {//merge object
                dispatch: _dispatch
            });
        }
        ;
    }
    ;
}

//reducer.js
/**
 * 合并所有的 reducers 
 *
 * 再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
 * 使用 combineReducers() 将多个 reducer 合并成为一个。
 * 之后会将其导入到 store.js 文件当中，并传递给 createStore()。
 * 
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { changeUserInfo, users } from './Pages/SystemManaPage/reducer';
import { changeLoginStatus } from './Pages/LoginPage/reducer';
import appReducer from './Pages/BasePage/reducer';
import unitPrjFill from './Pages/QualityManaPage/reducer';
import processPlanFill from './Pages/ProgressManaPage/reducer';
import flowHandle from './Pages/UserCenterPage/reducer';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

function createReducer() {
  return combineReducers({
    route: routeReducer,
    changeUserInfo,
    users,
    changeLoginStatus,
    unitPrjFill,
    processPlanFill,
    appReducer,
    flowHandle,
  });
}

export default createReducer;

//combineReducer.js
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utilities = require('./utilities');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable lodash3/prefer-lodash-method */

exports.default = function (reducers) {
    var reducerKeys = undefined;

    reducerKeys = Object.keys(reducers);//Object.keys will result in re-order

    return function (inputState, action) {
        if (inputState === undefined) {
            inputState = _immutable2.default.Map();
        }

        /* eslint-disable no-process-env */
        if (process.env.NODE_ENV !== 'production') {
            /* eslint-enable no-process-env */
            var warningMessage = undefined;

            warningMessage = (0, _utilities.getUnexpectedInvocationParameterMessage)(inputState, reducers, action);//(0,(a)=>{console.log(a)})('hello world!'). comma expression get the last item

            if (warningMessage) {
                /* eslint-disable no-console */
                console.error(warningMessage);
                /* eslint-enable no-console */
            }
        }

        return inputState.withMutations(function (temporaryState) {
            reducerKeys.forEach(function (reducerName) {
                var currentDomainState = undefined,
                    nextDomainState = undefined,
                    reducer = undefined;

                reducer = reducers[reducerName];

                currentDomainState = temporaryState.get(reducerName);

                nextDomainState = reducer(currentDomainState, action);

                (0, _utilities.validateNextState)(nextDomainState, reducerName, action);

                temporaryState.set(reducerName, nextDomainState);
            });
        });
    };
};

module.exports = exports['default'];
//# sourceMappingURL=combineReducers.js.map

//////////////////
// WEBPACK FOOTER
// ./~/redux-immutable/dist/combineReducers.js
// module id = 1333
// module chunks = 0

//compose.js
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  } else {
    var _ret = function () {
      var last = funcs[funcs.length - 1];
      var rest = funcs.slice(0, -1);//rest except last
      return {
        v: function v() {
          return rest.reduceRight(function (composed, f) {
            return f(composed);
          }, last.apply(undefined, arguments));
        }
      };
    }();

    if (typeof _ret === "object") return _ret.v;
  }
}



import {BasePage} from 'Pages/LoginPage';
import createRoutes from './routes';
const rootRoute = {
	component: BasePage,
	childRoutes: createRoutes(store),
};
//createRoutes.js
export default function createRoutes() {
	return [
		{
			path: '/',
			component: HomePage
    },
    {
      path: '/Login',
      component: UpdatedLoginPage
    },
    {
			path: '/userCenter',
			component: UserCenterPage,
            indexRoute: { component: TaskManagement },
            childRoutes: [
                { path: '/userCenter/taskManagement', component: TaskManagement,
                    childRoutes: [{ path: '/userCenter/taskManagement/MainView/cellPrjFill', component: PrjFillView},
                    { path: '/userCenter/taskManagement/MainView/progressPlanFill', component: ProgressPlanView},
                    { path: '/userCenter/taskManagement/MainView/realProgressFill', component: ProgressPlanView},
                    { path: '/userCenter/taskManagement/MainView/qualityTable', component: QualityTableView},
                    { path: '/userCenter/taskManagement/MainView/timeNodeFill', component: TimeNodeView},
                    { path: '/userCenter/taskManagement/MainView/accountManage', component: TimeNodeView},
                    { path: '/userCenter/taskManagement/MainView/drawing', component: DrawingView},
                    { path: '/userCenter/taskManagement/MainView/modDrawing', component: DrawingView},
                    { path: '/userCenter/taskManagement/MainView/itemPrjFill', component: PrjFillView},
                    { path: '/userCenter/taskManagement/MainView/cellArchive', component: CellArchiveView},
                    ]
                },
                { path: '/userCenter/processAlert', component: UsrCenterProAlert,
                    childRoutes: [{ path: '/userCenter/processAlert/MainView/:id', component: ProcessPreAlert}]
                },
            ]
    	},
	];
}

ReactDOM.render((
	<Provider store={store}>
		<Router
			history={browserHistory}
			routes={rootRoute}
			render={applyRouterMiddleware(useScroll())}>
		</Router>
	</Provider>
), document.getElementById('app'));

//applyRouterMiddleware.js
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  var withContext = middlewares.map(function (m) {
    return m.renderRouterContext;
  }).filter(function (f) {
    return f;
  });
  var withComponent = middlewares.map(function (m) {
    return m.renderRouteComponent;
  }).filter(function (f) {
    return f;
  });
  var makeCreateElement = function makeCreateElement() {
    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
    return function (Component, props) {
      return withComponent.reduceRight(function (previous, renderRouteComponent) {
        return renderRouteComponent(previous, props);
      }, baseCreateElement(Component, props));
    };
  };

  return function (renderProps) {
    return withContext.reduceRight(function (previous, renderRouterContext) {
      return renderRouterContext(previous, renderProps);
    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
      createElement: makeCreateElement(renderProps.createElement)
    })));
  };
};

module.exports = exports['default'];