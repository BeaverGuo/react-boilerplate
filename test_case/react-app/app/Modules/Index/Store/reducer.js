/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Reducer 接收旧的 state 和 action，返回新的 state。
 */

import {
	LOAD_REPOS,
	LOAD_REPOS_SUCCESS,
	LOAD_REPOS_ERROR,
} from './actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
	loading: false,
	error: false,
	repos: false,
});

function indexReducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_REPOS:
			return state
				.set('loading', true)
				.set('error', false)
				.set('repos', false);
		case LOAD_REPOS_SUCCESS:
			return state
				.set('repos', action.repos)
				.set('loading', false);
		case LOAD_REPOS_ERROR:
			return state
				.set('error', action.error)
				.set('loading', false);
		default:
			return state;
	}
}

export default indexReducer;
