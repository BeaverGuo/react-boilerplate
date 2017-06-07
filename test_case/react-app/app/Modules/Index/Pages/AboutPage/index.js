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

/* styles */
import styles from './styles.css';
/* components */
import RepoListItem from 'Components/RepoListItem';
import List from 'Components/List';
import ListItem from 'Components/ListItem';
import LoadingIndicator from 'Components/LoadingIndicator';
/* reselects & actions */
import {
	selectRepos,
	selectLoading,
	selectError,
} from './selectors';
import { loadRepos } from '../../Store/actions';

export class AboutPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        };
    }

	componentDidMount() {
		this.props.submitForm('ecidi');
	}

	openFeaturesPage = () => {
		this.props.changeRoute('/features');
	};

	render() {
		let mainContent = null;

		// loading的时候展示一个loading标识
		if (this.props.loading) {
			mainContent = (<List component={LoadingIndicator} />);
		// 展示存在的错误信息
		} else if (this.props.error !== false) {
			const ErrorComponent = () => (
				<ListItem item={'发生了一些错误, 请再次尝试!'} />
			);
			mainContent = (<List component={ErrorComponent} />);
		// 一切正常并且返回了github项目列表，则将它们展示出来
		} else if (this.props.repos !== false) {
			mainContent = (<List items={this.props.repos} component={RepoListItem} />);
		}
		return (
			<article>
				<Helmet title="About" />
				<div className={styles['route-body']}>
					<div className={styles['row-container']}>
						<div className={styles['row-2']}>
							<p>
								<h3>Ecidi数字化研发部</h3>
								<h5>研发部托管代码部署在
									<a href="https://github.com/ecidi">GitHub</a>
								</h5>
							</p>
						</div>
						<div className={styles['row-2']}>
							{mainContent}
						</div>
					</div>
				</div>
			</article>
		);
	}
}

AboutPage.propTypes = {
	changeRoute: React.PropTypes.func,
	repos: React.PropTypes.oneOfType([
		React.PropTypes.array,
		React.PropTypes.bool,
	]),
	loading: React.PropTypes.bool,
	error: React.PropTypes.oneOfType([
		React.PropTypes.object,
		React.PropTypes.bool,
	]),
	submitForm: React.PropTypes.func,
};

// 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
const mapStateToProps = createStructuredSelector({
	repos: selectRepos(),
	loading: selectLoading(),
	error: selectError(),
});

// 如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。
export function mapDispatchToProps(dispatch) {
	return {
		changeRoute: (url) => dispatch(push(url)),
		submitForm: (username) => {
			dispatch(loadRepos(username));
		},
	};
}

// react-redux 的使用方式
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 连接 React 组件与 Redux store。
export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
