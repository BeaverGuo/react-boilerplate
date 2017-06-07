import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOGIN } from './actionTypes';
import { loginSuccess, loginError } from './actions';

import request from 'Utils/request';
import { selectUserName, selectPassword } from '../Pages/LoginPage/selectors';


/**
 * isLogin 响应 request/response 处理
 */
export function* isLogin() {
    // 从store中选择username
    const username = yield select(selectUserName());
    const password = yield select(selectPassword());
    const requestURL = 'http://10.215.4.36:8007/main/login/';
    const repos = yield call(request, requestURL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (!repos.err) {
        yield put(loginSuccess(repos.data));
    } else {
        yield put(loginError(repos.err));
    }
}

/**
 * 关注LOGIN_START行为以及请求处理
 */
export function* loginWatcher() {
    while (yield take(LOGIN)) {
        yield call(isLogin);
    }
}

/**
 * Root saga管理监视器生命周期
 */
export function* userLogin() {
    // 通过fork观察者，我们可以继续执行
    const watcher = yield fork(loginWatcher);

    // 延迟执行直到location产生变化
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// 引导sagas
export default [
    userLogin,
];
