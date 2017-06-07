/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';

class Button extends React.Component {
	render() {
		const className = this.props.className ? this.props.className : styles.button;

		let button = (
			<a className={className} href={this.props.href} onClick={this.props.onClick}>{this.props.children}</a>
		);

		if (this.props.handleRoute) {
			button = (
				<button className={className} onClick={this.props.handleRoute} >{this.props.children}</button>
			);
		}

		return (
			<div className={styles['button-wrapper']}>
				{button}
			</div>
		);
	}
}

Button.propTypes = {
	className: PropTypes.string,
	handleRoute: PropTypes.func,
	href: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default Button;
