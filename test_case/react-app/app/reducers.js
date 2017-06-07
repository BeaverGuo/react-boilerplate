/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 合并所有的 reducers
 *
 * 再次强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。
 * 使用 combineReducers() 将多个 reducer 合并成为一个。
 * 之后会将其导入到 store.js 文件当中，并传递给 createStore()。
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import globalReducer from 'Modules/Base/Store/reducer';

// routeReducer
// 初始化redux store里的route
const routeInitialState = fromJS({
	locationBeforeTransitions: null,
});

// 将路由变动反映到redux store
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

// 通过一系列异步加载来创建总reducers
export default function createReducer(asyncReducers) {
	return combineReducers({
		route: routeReducer,
		global: globalReducer,
		...asyncReducers,
	});
}
