/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * HomePage
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { selectUsername } from 'Modules/Base/Pages/BasePage/selectors';

/* styles */
import styles from './styles.css';

export class ReadmePage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }

	componentDidMount() {
	}

	openFeaturesPage = () => {
		this.props.changeRoute('/features');
	};

	render() {
		const username = this.props.username;
		const pnt = (username || username !== '') ? '，' : '';
		return (
			<div>
				<Helmet title="Readme" />
				<div className={styles['route-body']}>
					<div className={styles['row-container']}>
						<div className={styles['row-2']}>
							<p>
								<h3>{username}{pnt}欢迎使用Ecidi前端开发框架</h3>
								<h5>
									<a href="https://github.com/ecidi/winterfall/tree/v2.0.0">winterfall  v2.0.0</a>
								</h5>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ReadmePage.propTypes = {
	changeRoute: React.PropTypes.func,
	username: React.PropTypes.string,
};

// 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
const mapStateToProps = createStructuredSelector({
	username: selectUsername(),
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
export default connect(mapStateToProps, mapDispatchToProps)(ReadmePage);
