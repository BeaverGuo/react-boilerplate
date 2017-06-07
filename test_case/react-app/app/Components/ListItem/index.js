/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './styles.css';

class ListItem extends React.Component {
	render() {
		return (
			<li className={this.props.className || styles.item}>
				<div className={styles['item-content']}>
					{this.props.item}
				</div>
			</li>
		);
	}
}

ListItem.propTypes = {
	className: React.PropTypes.string,
	item: React.PropTypes.any,
};

export default ListItem;
