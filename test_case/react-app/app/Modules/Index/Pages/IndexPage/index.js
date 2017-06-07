/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * IndexPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

/* styles */
import styles from './styles.css';

export class IndexPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }

	componentDidMount() {
	}

	openIndexPage = () => {
		this.props.changeRoute('/index');
	};

	openAboutPage = () => {
		this.props.changeRoute('/about');
	};

	openLoginPage = () => {
		this.props.changeRoute('/login');
	};

	render() {
		return (
			<article>
				<Helmet title="Index" />
				<div className={styles.wrapper}>
					<header className={styles.header}>
						<div className={styles['row-container']}>
							<div className={styles['row-2']}>
								<nav className={styles['nav-title']}>
									<button className={styles.btn} onClick={() => this.openIndexPage()}>Ecidi</button>
									<button className={styles.btn} onClick={() => this.openAboutPage()}>About</button>
									<button className={`${styles.btn} ${styles['btn-right']}`} onClick={() => this.openLoginPage()}>sign out</button>
								</nav>
							</div>
						</div>
					</header>
				</div>
				{React.Children.toArray(this.props.children)}
				<div className={styles['route-body']}>
					<div className={styles['row-container']}>
						<div className={styles['row-2']}>
							<h6>浙江华东工程数字技术有限公司</h6>
						</div>
					</div>
				</div>
			</article>
		);
	}
}

IndexPage.propTypes = {
	changeRoute: React.PropTypes.func,
	children: React.PropTypes.node,
};

// 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
const mapStateToProps = createStructuredSelector({
});

// 如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。
export function mapDispatchToProps(dispatch) {
	return {
		changeRoute: (url) => dispatch(push(url)),
	};
}

// react-redux 的使用方式
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 连接 React 组件与 Redux store。
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
