/**
 *
 * LoadPage
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import 'sanitize.css/sanitize.css';
import Helmet from 'react-helmet';

import 'antd/dist/antd.css';
import { Progress } from 'antd';

/* styles */
import styles from './styles.css';

class LoadPage extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            interval: null,
        };
    }

    componentWillMount() {
        const tmpInterval = setInterval(() => {
            const progress = this.state.progress;
            if (progress >= 100) {
                clearInterval(this.state.interval);
                this.props.changeRoute('/login');
                return;
            }
            this.setState({
                progress: (progress + 1),
            });
        }, 25);
        this.setState({
            interval: tmpInterval,
        });
    }

	render() {
		const progress = this.state.progress;
		return (
			<div className={styles.load}>
				<Helmet titleTemplate="%s - Ecidi" />
				<Progress status="active" percent={progress} />
			</div>
		);
	}
}

LoadPage.propTypes = {
    changeRoute: React.PropTypes.func,
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
export default connect(mapStateToProps, mapDispatchToProps)(LoadPage);

