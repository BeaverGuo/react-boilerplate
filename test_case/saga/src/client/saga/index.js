// @flow

import { all, IOEffect } from 'redux-saga/effects'
import watchSayHelloAsync from './hello-async'

// https://github.com/flowtype/flow-typed/blob/master/definitions/npm/redux-saga_v0.11.x/flow_v0.28.x-v0.37.x/test_redux-saga_0.11.x.js
// single entry point to start all Sagas at once
// yields an array with results of calling our two sagas
export default function* rootSaga(): Generator<IOEffect, *, *> {
  // these resulting Generators will be started in parallel.
  yield* all([
    watchSayHelloAsync(),
  ])
}
