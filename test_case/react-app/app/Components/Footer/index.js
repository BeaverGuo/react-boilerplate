/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.css';

class Footer extends React.Component {

	render() {
		return (
			<footer className={styles.footer}>
				<section>
					<p>制作： 浙江华东工程数字技术有限公司.</p>
				</section>
			</footer>
		);
	}
}

export default Footer;
