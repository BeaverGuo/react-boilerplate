import Helmet from 'react-helmet'
import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import HelloButton from './container/hello-button'
import HelloAsyncButton from './container/hello-async-button'
import Message from './container/message'
import MessageAsync from './container/message-async'

import { APP_NAME } from './config'
import Nav from './component/nav'
import HomePage from './container/HomePage'
import HelloPage from './component/HelloPage'
import HelloAsyncPage from './component/HelloAsyncPage'
import NotFoundPage from './component/NotFoundPage'

import {
    HOME_PAGE_ROUTE,
    HELLO_PAGE_ROUTE,
    HELLO_ASYNC_PAGE_ROUTE,
} from './routes'

const App = () => 
    <div style={{ paddingTop: 54 }}>
        <Helmet titleTemplate={`%s | ${ APP_NAME }`} defaultTitle={ APP_NAME } />
        <Nav />
        <Switch>
            <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
            <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />} />
            <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
            <Route component={NotFoundPage} />
        </Switch>
    </div>

export default App
