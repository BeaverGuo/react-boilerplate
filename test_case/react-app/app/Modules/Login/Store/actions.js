import {
	CHANGE_USERNAME,
	CHANGE_PASSWORD,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
} from './actionTypes';

export function changeUserName(username) {
	return {
		type: CHANGE_USERNAME,
		username: username,
	};
}

export function changePassword(password) {
	return {
		type: CHANGE_PASSWORD,
		password: password,
	};
}

export function login() {
	return {
		type: LOGIN,
	};
}

/**
 * 验证通过
 */
export function loginSuccess(repos) {
	return {
		type: LOGIN_SUCCESS,
		repos: repos,
	};
}

/**
 * 验证完成，出错
 */
export function loginError(error) {
	return {
		type: LOGIN_ERROR,
		error: error,
	};
}
