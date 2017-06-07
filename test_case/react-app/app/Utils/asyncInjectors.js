/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import invariant from 'invariant';
import warning from 'warning';
import createReducer from '../reducers';

// 验证redux store数据结构
export function checkStore(store) {
    const shape = {
        dispatch: isFunction,
        subscribe: isFunction,
        getState: isFunction,
        replaceReducer: isFunction,
        runSaga: isFunction,
        asyncReducers: isObject,
    };
    invariant(
        conformsTo(store, shape),
        '(app/Utils...) 异步注入错误: 不是一个有效的store'
    );
}

// 注入一个异步加载的reducer
export function injectAsyncReducer(store, isValid) {
    return function injectReducer(name, asyncReducer) {
        if (!isValid) checkStore(store);

        // 验证传入的name参数是否合规
        invariant(
            isString(name) && !isEmpty(name) && isFunction(asyncReducer),
            '(app/Utils...) reducer 注入检测错误: Expected `asyncReducer` to be a reducer function'
        );

        // 判断当前的store中是否存在name属性
        if (Reflect.has(store.asyncReducers, name)) return;

        // 如果不存在则加入name属性
        store.asyncReducers[name] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };
}

// 注入一个异步加载的saga
export function injectAsyncSagas(store, isValid) {
    return function injectSagas(sagas) {
        if (!isValid) checkStore(store);

        invariant(
            Array.isArray(sagas),
            '(app/Utils...) saga 注入检测错误: Expected `sagas` to be an array of generator functions'
        );

        warning(!isEmpty(sagas),
            '(app/Utils...) saga 注入检测错误: Received an empty `sagas` array'
        );

        sagas.map(store.runSaga);
    };
}

// 辅助创建injectors
export function getAsyncInjectors(store) {
    checkStore(store);

    return {
        injectReducer: injectAsyncReducer(store, true),
        injectSagas: injectAsyncSagas(store, true),
    };
}
