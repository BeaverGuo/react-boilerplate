/*
 * LoginPage
 * at the '/login' route
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { changeUsername, /*
changePassword*/ } from 'Modules/Base/Store/actions';

import styles from './styles.css';

export class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.onKeyup = this.onKeyup.bind(this);// 声明函数onKeyup
		this.state = {
			islogin: 2,
        };
	}

	componentDidMount() {
		document.getElementById('username').focus();
		const logBtn = document.getElementById('username');
		logBtn.addEventListener('keyup', this.onKeyup);

		document.getElementById('username').value = 'Jimmy';
	}

	componentDidUpdate() {
	}

	componentWillUnmount() {
		const logBtn = document.getElementById('username');
		logBtn.removeEventListener('keyup', this.onKeyup, false);
	}

	// enter键登录函数
	onKeyup(event) {
		event.preventDefault();
		if (event.keyCode === 13) {
			document.getElementById('loginBtn').click();
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const logInfo = {};
		const username = document.getElementById('username');
		/*
		const password = document.getElementById('password');
		*/
		logInfo.username = username.value;
		/*
		logInfo.password = password.value;
		*/
		// 判断一下用户和密码是否补全
		this.props.changeUsername(logInfo.username);
		/*
		this.props.changePassword(logInfo.password);*/
		if (logInfo.username && logInfo.username !== '') {
			this.openBasePage();
		} else {
			this.setState({
				islogin: 0,
			});
		}
	}
	/**
	 * 改变route
	 * @param  {string} 指向我们想跳转过去的路径
	 */
	openRoute = (route) => {
		this.props.changeRoute(route);
	};
	/**
	 * 改变路由到 '/'
	 */
	openBasePage = () => {
		this.openRoute('/index');
	};

	/*
	* <input id="password" type="password" placeholder="密码" />
	*/
	render() {
		return (
			<div className={styles.login}>
				<Helmet title="Sign in" />
				<div className={styles.systemTitle}></div>
				<div className={styles.loginBox}>
					<input id="username" type="text" placeholder="username" />
					{this.state.islogin === 0 ? <div className={styles.error}>input a username</div> : <div className={styles.error}></div>}
					<button id="loginBtn" onClick={(e) => this.handleSubmit(e)}>sign in</button>
				</div>
			</div>
		);
	}
}

LoginPage.propTypes = {
	changeRoute: React.PropTypes.func,
	changeUsername: React.PropTypes.func,
	/*
	changePassword: React.PropTypes.func,*/
};

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
	return {
		changeUsername: (username) => dispatch(changeUsername(username)),
		/*
		changePassword: (password) => dispatch(changePassword(password)),*/
		changeRoute: (url) => dispatch(push(url)),
	};
}

// react-redux 的使用方式
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// 连接 React 组件与 Redux store。
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
