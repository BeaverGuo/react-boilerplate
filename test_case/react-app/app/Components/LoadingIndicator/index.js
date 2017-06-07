/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.css';

class LoadingIndicator extends React.Component {

	render() {
		return (
			<div>
				<div className={styles['sk-fading-circle']}>
					<div className={styles['sk-circle']}></div>
					<div className={styles['sk-circle2']}></div>
					<div className={styles['sk-circle3']}></div>
					<div className={styles['sk-circle4']}></div>
					<div className={styles['sk-circle5']}></div>
					<div className={styles['sk-circle6']}></div>
					<div className={styles['sk-circle7']}></div>
					<div className={styles['sk-circle8']}></div>
					<div className={styles['sk-circle9']}></div>
					<div className={styles['sk-circle10']}></div>
					<div className={styles['sk-circle11']}></div>
					<div className={styles['sk-circle12']}></div>
				</div>
			</div>
		);
	}
}

export default LoadingIndicator;
