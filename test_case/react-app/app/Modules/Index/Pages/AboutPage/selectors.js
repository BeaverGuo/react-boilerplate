/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Reselect 高效地获取store里的数据。
 * eg:
 * const mySelector = createSelector(
 *     state => state.values.value1,
 *     state => state.values.value2,
 *     (value1, value2) => value1 + value2
 * )
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('index');

const selectRepos = () => createSelector(
	selectHome(),
	(homeState) => homeState.get('repos')
);

const selectLoading = () => createSelector(
	selectHome(),
	(homeState) => homeState.get('loading')
);

const selectError = () => createSelector(
	selectHome(),
	(homeState) => homeState.get('error')
);

export {
	selectHome,
	selectRepos,
	selectLoading,
	selectError,
};
