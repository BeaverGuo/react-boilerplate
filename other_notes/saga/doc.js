//saga catch errors
//use try catch
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

// ...

function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}

//test case
import { call, put } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'), // description object of async api call
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)

// create a fake error
const error = {}

// expects a dispatch instruction
assert.deepEqual(
  iterator.throw(error).value, // use iterator throw
  put({ type: 'PRODUCTS_REQUEST_FAILED', error }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_REQUEST_FAILED', error })"
)

//Of course, you're not forced to handle your API errors inside try/catch blocks. You can also make your API service return a normal value with some error flag on it. For example, you can catch Promise rejections and map them to an object with an error field.

import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi) // response and error must
  if (response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}

//log every action

import { select, takeEvery } from 'redux-saga/effects'

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}

// use take
import { select, take } from 'redux-saga/effects'

function* watchAndLog() { // watchAndLog is suspendended until any matched aciton is dispatched
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}

//As a simple example, suppose that in our Todo application, we want to watch user actions and show a congratulation message after the user has created his first three todos.

import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}

//So far we have all needed Effects in order to implement the above flow. We can wait for specific actions in the store using the take Effect. We can make asynchronous calls using the call Effect. Finally, we can dispatch actions to the store using the put Effect.

import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) { // infinite loop
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password) // `call` generator function
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT') // The loginFlow implements its entire flow inside a while (true) loop, which means once we reach the last step in the flow (LOGOUT) we start a new iteration by waiting for a new LOGIN_REQUEST action. 
      yield call(Api.clearItem, 'token')
    }
  }
}
//As you noted, call isn't only for invoking functions returning Promises. We can also use it to invoke other Generator functions. 
//loginFlow will wait for authorize until it terminates and returns (i.e. after performing the api call, dispatching the action and then returning the token to loginFlow).
//In the case of authorize failed, it'll return an undefined value, which will cause loginFlow to skip the previous process and wait for a new LOGIN_REQUEST action.
//Observe how the entire logic is stored in one place. A new developer reading our code doesn't have to travel between various places in order to understand the control flow. It's like reading a synchronous algorithm: steps are laid out in their natural order. And we have functions which call other functions and wait for their results.


/*But there is still a subtle issue with the above approach

Suppose that when the loginFlow is waiting for the following call to resolve:

function* loginFlow() {
  while (true) {
    // ...
    try {
      const token = yield call(authorize, user, password)
      // ...
    }
    // ...
  }
}
The user clicks on the Logout button causing a LOGOUT action to be dispatched.

UI                              loginFlow
--------------------------------------------------------
LOGIN_REQUEST...................call authorize.......... waiting to resolve
........................................................
........................................................
LOGOUT.................................................. missed!
........................................................
................................authorize returned...... dispatch a `LOGIN_SUCCESS`!!
........................................................

The problem with the above code is that call is a blocking Effect. i.e. the Generator can't perform/handle anything else until the call terminates. But in our case we do not only want loginFlow to execute the authorization call, but also watch for an eventual LOGOUT action that may occur in the middle of this call. That's because LOGOUT is concurrent to the authorize call.

fork come to rescue
To express non-blocking calls, the library provides another Effect: fork. When we fork a task, the task is started in the background and the caller can continue its flow without waiting for the forked task to terminate.

*/

import { fork, call, take, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    yield fork(authorize, user, password) // concurrency
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem, 'token')
  }
}

//But we're not yet done. If we take a LOGOUT in the middle of an API call, we have to cancel the authorize process, otherwise we'll have 2 concurrent tasks evolving in parallel: The authorize task will continue running and upon a successful (resp. failed) result, will dispatch a LOGIN_SUCCESS (resp. a LOGIN_ERROR) action leading to an inconsistent state.

//In order to cancel a forked task, we use a dedicated Effect cancel

import { take, put, call, fork, cancel } from 'redux-saga/effects'

// ...

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT')
      yield cancel(task)
    yield call(Api.clearItem, 'token')
  }
}

//Suppose that when we receive a LOGIN_REQUEST action, our reducer sets some isLoginPending flag to true so it can display some message or spinner in the UI. If we get a LOGOUT in the middle of an API call and abort the task by simply killing it (i.e. the task is stopped right away), then we may end up again with an inconsistent state. We'll still have isLoginPending set to true and our reducer will be waiting for an outcome action (LOGIN_SUCCESS or LOGIN_ERROR).

//Fortunately, the cancel Effect won't brutally kill our authorize task, it'll instead give it a chance to perform its cleanup logic. The cancelled task can handle any cancellation logic (as well as any other type of completion) in its finally block. Since a finally block execute on any type of completion (normal return, error, or forced cancellation), there is an Effect cancelled which you can use if you want handle cancellation in a special way:

import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

//The yield statement is great for representing asynchronous control flow in a simple and linear style, but we also need to do things in parallel. We can't simply write:

// wrong, effects will be executed in sequence
const users  = yield call(fetch, '/users'),
      repos = yield call(fetch, '/repos')
//Because the 2nd effect will not get executed until the first call resolves. Instead we have to write:

import { all, call } from 'redux-saga/effects'

// correct, effects will get executed in parallel
const [users, repos]  = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos')
])

//The following sample shows a task that triggers a remote fetch request, and constrains the response within a 1 second timeout.

import { race, take, put } from 'redux-saga/effects'
import { delay } from 'redux-saga'

function* fetchPostsWithTimeout() {
  const {posts, timeout} = yield race({
    posts: call(fetchApi, '/posts'),
    timeout: call(delay, 1000)
  })

  if (posts)
    put({type: 'POSTS_RECEIVED', posts})
  else
    put({type: 'TIMEOUT_ERROR'})
}

//generator
function* sum() {
  var x = 0
  x += (yield "1st " + x)
  x += (yield "2nd " + x)
  x += (yield "3rd " + x)
  x += (yield "4th " + x)
}

var it = sum()
console.log(it.next('unused')) //1st 0  x = 0 + 1 get 1 from next(1) 
console.log(it.next(1)) //2nd 1 x = 1 + 2 
console.log(it.next(2))
console.log(it.next(3))

//passing values to generator
function* sum() {
  var x = 0
  while( true ) {
    x += yield x
  }
}
var it = sum()
console.log(it.next('unused')) // 0
console.log(it.next(1)) // 1 
console.log(it.next(2)) // 3
console.log(it.next(3)) // 6

//make it iterable

var myIterable = {}
myIterable[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}

for (let value of myIterable) {
  console.log(value) //1 2 3
}


[...myIterable] //[1 2 3]

//with async code (+promises)

const fetchUser = () => new Promise (
  resolve => {
    setTimeout( () => resolve (
      {
        username: 'Joe',
        hash: '12345'
      }
    ), 4000)
  }
)

function* apiCalls(username, password) {
  var user = yield fetchUser(username)
  return user
}

var it = apiCalls()

var promise = it.next().value
console.log(promise)

promise.then((result) => {
  console.log(result)
  var response = it.next(result)
  console.log(response)
})



