import { delay } from 'redux-saga'
import { put, call, takeEvery, all } from 'redux-saga/effects'

/*Instead of doing yield delay(1000), we're now doing yield call(delay, 1000). What's the difference?

In the first case, the yield expression delay(1000) is evaluated before it gets passed to the caller of next (the caller could be the middleware when running our code. It could also be our test code which runs the Generator function and iterates over the returned Generator). So what the caller gets is a Promise, like in the test code above.

In the second case, the yield expression call(delay, 1000) is what gets passed to the caller of next. call just like put, returns an Effect which instructs the middleware to call a given function with the given arguments. In fact, neither put nor call performs any dispatch or asynchronous call by themselves, they simply return plain JavaScript objects.
*/



// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  // use the call Effect
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([ //the two resulting Generators will be started in parallel.
    helloSaga(),
    watchIncrementAsync()
  ])
}
