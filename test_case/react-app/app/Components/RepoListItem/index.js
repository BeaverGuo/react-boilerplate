/**
 * RepoListItem
 *
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectUsername } from 'Modules/Base/Pages/BasePage/selectors';
import ListItem from 'Components/ListItem';
import IssueIcon from 'Components/IssueIcon';

import styles from './styles.css';

export class RepoListItem extends React.Component {
	render() {
		const item = this.props.item;
		let nameprefix = '';

		// github项目不是自己所属的，则显示所属组织名字
		if (item.owner.login !== this.props.username) {
			nameprefix = `${item.owner.login}/`;
		}

		// 将github项目内容组合在一起
		const content = (
			<div className={styles['link-wrapper']}>
				<a
					className={styles['link-repo']}
					href={item.html_url}
					target="_blank"
				>
					{nameprefix + item.name}
				</a>
				<a
					className={styles['link-issues']}
					href={`${item.html_url}/issues`}
					target="_blank"
				>
					<IssueIcon className={styles['issue-icon']} />
					{item.open_issues_count}
				</a>
			</div>
		);

		// 将github项目内容渲染到list item中
		return (
			<ListItem key={`repo-list-item-${item.full_name}`} item={content} />
		);
	}
}

RepoListItem.propTypes = {
	item: React.PropTypes.object,
	username: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.bool,
	]),
};

// 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
const mapStateToProps = createStructuredSelector({
	username: selectUsername(),
});

export default connect(mapStateToProps)(RepoListItem);
