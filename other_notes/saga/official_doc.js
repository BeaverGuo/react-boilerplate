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

/*suppose we have 2 UI buttons:

The first starts a task in the background that runs in an endless loop while (true) (e.g. syncing some data with the server each x seconds).

Once the background task is started, we enable a second button which will cancel the task
*/
import { race, take, put } from 'redux-saga/effects'

function* backgroundTask() {
  while (true) { ... }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
//In the case a CANCEL_TASK action is dispatched, the race Effect will automatically cancel backgroundTask by throwing a cancellation error inside it.


// sequence saga using yield *
function* playLevelOne() { ... }

function* playLevelTwo() { ... }

function* playLevelThree() { ... }

function* game() {
  const score1 = yield* playLevelOne()
  yield put(showScore(score1))

  const score2 = yield* playLevelTwo()
  yield put(showScore(score2))

  const score3 = yield* playLevelThree()
  yield put(showScore(score3))
}

//Note that using yield* will cause the JavaScript runtime to spread the whole sequence. The resulting iterator (from game()) will yield all values from the nested iterators. A more powerful alternative is to use the more generic middleware composition mechanism.


//composing sagas
/*While using yield* provides an idiomatic way of composing Sagas, this approach has some limitations:

You'll likely want to test nested generators separately. This leads to some duplication in the test code as well as the overhead of the duplicated execution. We don't want to execute a nested generator but only make sure the call to it was issued with the right argument.

More importantly, yield* allows only for sequential composition of tasks, so you can only yield* to one generator at a time.
*/
function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}

function* watchFetch() {
  while (yield take(FETCH_POSTS)) {
    yield call(fetchPosts) // waits for the fetchPosts task to terminate
  }
}

//Yielding to an array of nested generators will start all the sub-generators in parallel, wait for them to finish, then resume with all the results

function* mainSaga(getState) {
  const results = yield all([call(task1), call(task2), ...])
  yield put(showResults(results))
}

//For example, you may want the user to finish some game in a limited amount of time:

function* game(getState) {
  let finished
  while (!finished) {
    // has to finish in 60 seconds
    const {score, timeout} = yield race({ // race like promise
      score: call(play, getState),
      timeout: call(delay, 60000)
    })

    if (!timeout) {
      finished = true
      yield put(showScore(score))
    }
  }
}

// task cancellation
yield cancel(task)

import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { someApi, actions } from 'somewhere'

function* bgSync() { // callee
  try {
    while (true) {
      yield put(actions.requestStart())
      const result = yield call(someApi)
      yield put(actions.requestSuccess(result))
      yield call(delay, 5000)
    }
  } finally { // cancellation of bgSyncTask will cause the Generator to jump to the finally block
    if (yield cancelled()) // use yield cancelled() to check
      yield put(actions.requestFailure('Sync cancelled!'))
  }
}

function* main() {
  while ( yield take(START_BACKGROUND_SYNC) ) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
    yield take(STOP_BACKGROUND_SYNC)
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask) // caller decide to cancell  it triggers a kind of a signal that propagates down to the callee (and possibly to any deep operations called by the callee itself). All deeply pending operations will be cancelled.
  }
}

// /So we saw that Cancellation propagates downward (in contrast returned values and uncaught errors propagates upward). 

//It's important to remember that yield cancel(task) doesn't wait for the cancelled task to finish (i.e. to perform its finally block). The cancel effect behaves like fork. It returns as soon as the cancel was initiated. Once cancelled, a task should normally return as soon as it finishes its cleanup logic.


/*Automatic cancellation

Besides manual cancellation there are cases where cancellation is triggered automatically

In a race effect. All race competitors, except the winner, are automatically cancelled.

In a parallel effect (yield all([...])). The parallel effect is rejected as soon as one of the sub-effects is rejected (as implied by Promise.all). In this case, all the other sub-effects are automatically cancelled.

In redux-saga you can dynamically fork tasks that execute in the background using 2 Effects

fork is used to create attached forks
spawn is used to create detached forks
A Saga terminates only after
It terminates its own body of instructions
All attached forks are themselves terminated

*/

import { delay } from 'redux-saga'
import { fork, call, put } from 'redux-saga/effects'
import api from './somewhere/api' // app specific
import { receiveData } from './somewhere/actions' // app specific

function* fetchAll() {
  const task1 = yield fork(fetchResource, 'users')
  const task2 = yield fork(fetchResource, 'comments')
  yield call(delay, 1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}

function* main() {
  yield call(fetchAll)
}
call(fetchAll) will terminate after:

/*The fetchAll body itself terminates, this means all 3 effects are performed. Since fork effects are non blocking, the task will block on call(delay, 1000)

The 2 forked tasks terminate, i.e. after fetching the required resources and putting the corresponding receiveData actions
*/

The attentive reader might have noticed the fetchAll saga could be rewritten using the parallel Effect

function* fetchAll() {
  yield all([
    call(fetchResource, 'users'),     // task1
    call(fetchResource, 'comments'),  // task2,
    call(delay, 1000)
  ])
}
/*In fact, attached forks shares the same semantics with the parallel Effect:

We're executing tasks in parallel
The parent will terminate after all launched tasks terminate
And this applies for all other semantics as well (error and cancellation propagation). You can understand how attached forks behave by simply considering it as a dynamic parallel Effect.

error handling
If at a moment, for example, fetchAll is blocked on the call(delay, 1000) Effect, and say, task1 failed, then the whole fetchAll task will fail causing

Cancellation of all other pending tasks. This includes:

The main task (the body of fetchAll): cancelling it means cancelling the current Effect call(delay, 1000)
The other forked tasks which are still pending. i.e. task2 in our example.
The call(fetchAll) will raise itself an error which will be caught in the catch body of main

Note we're able to catch the error from call(fetchAll) inside main only because we're using a blocking call. And that we can't catch the error directly from fetchAll. This is a rule of thumb, you can't catch errors from forked tasks. A failure in an attached fork will cause the forking parent to abort (Just like there is no way to catch an error inside a parallel Effect, only from outside by blocking on the parallel Effect).


Detached forks live in their own execution context. A parent doesn't wait for detached forks to terminate. Uncaught errors from spawned tasks are not bubbled up to the parent. And cancelling a parent doesn't automatically cancel detached forks (you need to cancel them explicitly).

In short, detached forks behave like root Sagas started directly using the middleware.run API.
*/

const takeEvery = (pattern, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
})

const takeLatest = (pattern, saga, ...args) => fork(function*() {
  let lastTask
  while (true) {
    const action = yield take(pattern)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})

/*Connecting Sagas to external Input/Output
When a Saga is started (either at startup or later dynamically), the middleware automatically connects its take/put to the store. The 2 Effects can be seen as a sort of Input/Output to the Saga.

redux-saga provides a way to run a Saga outside of the Redux middleware environment and connect it to a custom Input/Output.
*/

import { runSaga } from 'redux-saga'

function* saga() { ... }

const myIO = {
  subscribe: ..., // this will be used to resolve take Effects
  dispatch: ...,  // this will be used to resolve put Effects
  getState: ...,  // this will be used to resolve select Effects
}

runSaga(
  myIO
  saga,
)

/* Channel
How to use the yield actionChannel Effect to buffer specific actions from the Store.

How to use the eventChannel factory function to connect take Effects to external event sources.

How to create a channel using the generic channel factory function and use it in take/put Effects to communicate between two Sagas.
*/
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }

//The above example illustrates the typical watch-and-fork pattern. The watchRequests saga is using fork to avoid blocking and thus not missing any action from the store. A handleRequest task is created on each REQUEST action. So if there are many actions fired at a rapid rate there can be many handleRequest tasks executing concurrently.

/*Imagine now that our requirement is as follows: we want to process REQUEST serially. If we have at any moment four actions, we want to handle the first REQUEST action, then only after finishing this action we process the second action and so on...

The first thing is to create the action channel. We use yield actionChannel(pattern) where pattern is interpreted using the same rules we mentioned previously with take(pattern). The difference between the 2 forms is that actionChannel can buffer incoming messages if the Saga is not yet ready to take them (e.g. blocked on an API call).
*/

import { take, actionChannel, call, ... } from 'redux-saga/effects'

function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }

/*The important thing to note is how we're using a blocking call. The Saga will remain blocked until call(handleRequest) returns. But meanwhile, if other REQUEST actions are dispatched while the Saga is still blocked, they will queued internally by requestChan. When the Saga resumes from call(handleRequest) and executes the next yield take(requestChan), the take will resolve with the queued message.

By default, actionChannel buffers all incoming messages without limit. If you want a more control over the buffering, you can supply a Buffer argument to the effect creator. Redux-Saga provides some common buffers (none, dropping, sliding) but you can also supply your own buffer implementation. See API docs for more details.

For example if you want to handle only the most recent five items you can use:
*/
import { buffers } from 'redux-saga'
import { actionChannel } from 'redux-saga/effects'

function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))
  ...
}

/*Like actionChannel (Effect), eventChannel (a factory function, not an Effect) creates a Channel for events but from event sources other than the Redux Store.

*/

import { eventChannel, END } from 'redux-saga'

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END)
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}

//The first argument in eventChannel is a subscriber function. The role of the subscriber is to initialize the external event source (above using setInterval), then routes all incoming events from the source to the channel by invoking the supplied emitter. In the above example we're invoking emitter on each second.


import { take, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(seconds) { ... }

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    console.log('countdown terminated')
  }
}


import { take, put, call, cancelled } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(seconds) { ... }

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    if (yield cancelled()) {
      chan.close()
      console.log('countdown cancelled')
    }    
  }
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

var promise = it.next().value // start generator
console.log(promise)

promise.then((result) => {
  console.log(result)
  var response = it.next(result) // resolve result
  console.log(response)
})





