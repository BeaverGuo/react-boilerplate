/*
 * Reducer
 *
 * reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。
 *
 * 举例来说:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
} from './actionTypes';
import { fromJS } from 'immutable';

// 该应用初始化state
const initialState = fromJS({
	loading: false,
	islogin: 2,
	userInfo: {},
	username: '',
	password: '',
});

function defaultReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return state
				.set('userInfo', {})
				.set('islogin', 2);
		case LOGIN_SUCCESS:
			return state
				.set('userInfo', action.repos)
				.set('islogin', 1);
		case LOGIN_ERROR:
			return state
				.set('islogin', 0);
		case CHANGE_USERNAME:
			return state
				.set('username', action.username);
		case CHANGE_PASSWORD:
			return state
				.set('password', action.password);
		default:
			return state;
	}
}

export default defaultReducer;
