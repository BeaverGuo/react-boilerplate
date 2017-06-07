/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Actions
 */

import {
	LOAD_REPOS,
	LOAD_REPOS_SUCCESS,
	LOAD_REPOS_ERROR,
} from './actionTypes';

// <: =======================
// 用户github项目数据
export function loadRepos(username) {
	return {
		type: LOAD_REPOS,
		username: username,
	};
}

export function reposLoaded(repos) {
	return {
		type: LOAD_REPOS_SUCCESS,
		repos: repos,
	};
}

export function repoLoadingError(error) {
	return {
		type: LOAD_REPOS_ERROR,
		error: error,
	};
}
// =======================:>
