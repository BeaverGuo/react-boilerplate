// @flow

import { connect } from 'react-redux'

import { sayHelloAsyncRequest } from '../action/hello'
import FollowOthers from '../component/follow-others'

const mapStateToProps = () => ({
  label: 'Say hello asynchronously and send 1234',
})

const mapDispatchToProps = dispatch => ({
  handleClick: () => { dispatch(sayHelloAsyncRequest(1234)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowOthers)
