/**
 * Copyright (c) 2016-present, ecidi.
 * All rights reserved.
 *
 * This source code is licensed under the GPL-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'whatwg-fetch';

// 解析通过网络响应返回来的JSON字符串
function parseJSON(response) {
    return response.json();
}

// 检查网络响应返回是否正常，如果不正常就抛出一个错误
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

// 请求一个地址，返回一个promise
export default function request(url, options) {
    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => ({
            data,
        }))
        .catch((err) => ({
            err,
        }));
}
