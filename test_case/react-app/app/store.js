/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Store
 * Redux 应用只有一个单一的 store。
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
// import { autoRehydrate, persistStore } from 'redux-persist-immutable';
// import localForage from 'localForage';

const sagaMiddleware = createSagaMiddleware();
const devtools = window.devToolsExtension || (() => (noop) => noop);

export default function configureStore(initialState = {}, history) {
	// 通过一下两个中间件创建store
	// 1. sagaMiddleware: 使redux-sagas工作
	// 2. routerMiddleware: 同步location/URL 定向到state
	const middlewares = [
		sagaMiddleware,
		routerMiddleware(history),
	];

	const enhancers = [
		// autoRehydrate(),
		applyMiddleware(...middlewares),
		devtools(),
	];

	// 创建 Redux store 来存放应用的状态。
	// createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
	// compose 从右到左来组合多个函数。
	const store = createStore(
		createReducer(),
		fromJS(initialState),
		compose(...enhancers)
	);
	// persistStore(store, {storage: localForage});

	// 让游览器强制刷新下页面，用来更新prevRoutingState。
	// history.push('/');

	// 扩展
	store.runSaga = sagaMiddleware.run;
	store.asyncReducers = {}; // 异步reducer注册信息

	// 促使reducers热部署
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
