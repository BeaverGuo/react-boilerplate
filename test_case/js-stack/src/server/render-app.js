import Helmet from 'react-helmet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { SheetsRegistry, SheetsRegistryProvider } from 'react-jss'

import { APP_CONTAINER_CLASS, JSS_SSR_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'

import initStore from './init-store'
import App from './../shared/app'

import { isProd } from '../shared/util'

const renderApp = (location, plainPartialState, routerContext = {}) => {
    const store = initStore(plainPartialState)
    const sheets = new SheetsRegistry()
    const appHtml = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={location} context={routerContext}>
                <SheetsRegistryProvider registry={sheets}>
                    <App />
                </SheetsRegistryProvider>
            </StaticRouter>
        </Provider>
    )
    // React Helmet: A library to inject content to the head of a React app,
    // on both the client and the server.
    const head = Helmet.rewind()
    return (
       `<!doctype html>
        <html>
        <head>
            ${head.title}
            ${head.meta}
            <link rel="stylesheet" href="${STATIC_PATH}/css/bootstrap.min.css">
            <style class="${JSS_SSR_CLASS}">${sheets.toString()}</style>
        </head>
        <body>
            <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
            </script>
            <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
        </body>
        </html>
        `
    )
}

export default renderApp
