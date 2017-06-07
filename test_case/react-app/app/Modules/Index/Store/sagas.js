/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from './actionTypes';
import { reposLoaded, repoLoadingError } from './actions';

import request from 'Utils/request';

// Github 响应 request/response 处理
export function* getRepos(username) {
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

    const repos = yield call(request, requestURL);

    if (!repos.err) {
        // dispatch
        yield put(reposLoaded(repos.data));
    } else {
        // dispatch
        yield put(repoLoadingError(repos.err));
    }
}

// 关注所需处理的行为以及请求
export function* getReposWatcher() {
    // saga会阻塞take，直到一个匹配的action被发起。
    while (true) {
        const action = yield take(LOAD_REPOS);
        yield call(getRepos, action.username);
    }
}

// saga管理观察者生命周期
export function* githubData() {
    // 通过fork观察者，我们可以继续执行
    const watcher = yield fork(getReposWatcher);

    // 延迟执行直到location产生变化
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    githubData,
];
