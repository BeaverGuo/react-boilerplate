/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * routes.js 整个应用的路径配置
 */

import { getAsyncInjectors } from './Utils/asyncInjectors';

const errorLoading = (err) => {
	console.error('动态页面加载失败！', err);
};

const loadModule = (cb) => (componentModule) => {
	cb(null, componentModule.default);
};

export default function createRoutes(store) {
	// 异步注入
	const {
		injectReducer,
		injectSagas,
	} = getAsyncInjectors(store);

	// 为解决数据持久化之后，
	// 刷新页面导致初始化的redux store和缓存的redux store结构不对应问题。
	Promise.all([
		System.import('Modules/Login/Store/reducer'),
	]).then(([reducer]) => {
		injectReducer('login', reducer.default);
	});
	Promise.all([
		System.import('Modules/Index/Store/reducer'),
	]).then(([reducer]) => {
		injectReducer('index', reducer.default);
	});

	return [{
		path: '/',
		getComponent: (nextState, cb) => {
			const importModules = Promise.all([
				System.import('Modules/Load/Pages/LoadPage'),
			]);

			const renderRoute = loadModule(cb);

			importModules.then(([component]) => {
				renderRoute(component);
			});

			importModules.catch(errorLoading);
		},
	}, {
		path: '/login',
		getComponent: (nextState, cb) => {
			const importModules = Promise.all([
				System.import('Modules/Login/Store/sagas'),
				System.import('Modules/Login/Pages/LoginPage'),
			]);

			const renderRoute = loadModule(cb);

			importModules.then(([sagas, component]) => {
				injectSagas(sagas.default);
				renderRoute(component);
			});

			importModules.catch(errorLoading);
		},
		childRoutes: [
		{
			path: '/logout',
			name: 'logout',
			getComponent: (nextState, cb) => {
				const importModules = Promise.all([
					System.import('Modules/Login/Pages/LogoutPage'),
				]);

				const renderRoute = loadModule(cb);

				importModules.then(([component]) => {
					renderRoute(component);
				});

				importModules.catch(errorLoading);
			},
		}],
	}, {
		path: '/index',
		getComponent: (nextState, cb) => {
			const importModules = Promise.all([
				System.import('Modules/Index/Store/sagas'),
				System.import('Modules/Index/Pages/IndexPage'),
			]);

			const renderRoute = loadModule(cb);

			importModules.then(([sagas, component]) => {
				injectSagas(sagas.default);
				renderRoute(component);
			});

			importModules.catch(errorLoading);
		},
		indexRoute: {
			path: '/readme',
			name: 'readme',
			getComponent: (nextState, cb) => {
				const importModules = Promise.all([
					System.import('Modules/Index/Pages/ReadmePage'),
				]);

				const renderRoute = loadModule(cb);

				importModules.then(([component]) => {
					renderRoute(component);
				});

				importModules.catch(errorLoading);
			},
		},
		childRoutes: [
		{
			path: '/about',
			name: 'about',
			getComponent: (nextState, cb) => {
				const importModules = Promise.all([
					System.import('Modules/Index/Pages/AboutPage'),
				]);

				const renderRoute = loadModule(cb);

				importModules.then(([component]) => {
					renderRoute(component);
				});

				importModules.catch(errorLoading);
			},
		}],
	}];
}
