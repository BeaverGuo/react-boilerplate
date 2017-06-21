// @flow

/* eslint-disable no-unused-vars, no-undef, no-console */

import { put, call, takeEvery } from 'redux-saga/effects'

import type {
  IOEffect,
  TakeEffect,
  PutEffect,
  SelectEffect,
} from 'redux-saga/effects'

import { helloEndpointRoute } from '../../shared/routes'
import request from '../utils/request'
import {
  SAY_HELLO_ASYNC_REQUEST,
  sayHelloAsyncSuccess,
  sayHelloAsyncFailure,
} from '../action/hello'

/**
 * sayHelloAsync request/response handler
 */

// Our worker Saga: will perform the async sayhello task
export function* sayHelloAsync(action: { payload: number}): Generator<IOEffect, *, *> {
  try {
    // use the call Effect: call function arguments
    const { payload } = action
    const data = yield call(request, helloEndpointRoute(payload), { method: 'GET' })
    if (!data.serverMessage) throw Error('No message received')
    yield put(sayHelloAsyncSuccess(data.serverMessage))
  } catch (ex) {
    yield put(sayHelloAsyncFailure(ex))
  }
}

// Our watcher Saga: spawn a new sayHelloAsync task on each INCREMENT_ASYNC
export default function* watchSayHelloAsync(): Generator<IOEffect, *, *> {
  yield takeEvery(SAY_HELLO_ASYNC_REQUEST, sayHelloAsync)
}
