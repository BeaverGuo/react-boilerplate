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
	CHANGE_USERNAME,
	PURGE_USERNAME,
} from './actionTypes';

export function changeUsername(username) {
	return {
		type: CHANGE_USERNAME,
		username: username,
	};
}

export function purgeUsername() {
	return {
		type: PURGE_USERNAME,
	};
}

