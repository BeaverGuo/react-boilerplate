/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * app.js 整个应用的总入口
 */

// 让redux-saga支持es6语法包
import 'babel-polyfill';

// import 'file?name=[name].[ext]!./favicon.ico';

// 引入第三方控件
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './store';

// 创建带history的redux store，让store和history结合在一起的一部分。
// 使用react-router提供的browserHistory 。
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Redux devTools，chrome控件，监听redux store的变动。
if (window.devToolsExtension) {
	window.devToolsExtension.updateStore(store);
}

// 让store和history结合在一起的另一部分，加强版的history。
// 使用syncHistoryWithStore关联browserHistory和store.routing。
// 允许将history中接受到的变化反应到state中去。
import { selectLocationState } from 'Modules/Base/Pages/BasePage/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: selectLocationState(),
});

// 建立router，包装所有的Routes到BasePage组件中。
import BasePage from 'Modules/Base/Pages/BasePage';
import createRoutes from './routes';
const rootRoute = {
	component: BasePage,
	childRoutes: createRoutes(store),
};

ReactDOM.render(
	<Provider store={store}>
		<Router
			history={history}
			routes={rootRoute}
			render={
				// 跳转到新页面去时模仿游览器默认行为滚动到页面顶部。
				applyRouterMiddleware(useScroll())
			}
		/>
	</Provider>,
	document.getElementById('app')
);

// 离线缓存机制
// 通过ServiceWorker和AppCache实现，需要配置webpack文件。
import { install } from 'offline-plugin/runtime';
install();
