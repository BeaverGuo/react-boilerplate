import {
    homePage,
    helloPage,
    helloAsyncPage,
    helloEndpoint,
} from './controller'

import {
    HOME_PAGE_ROUTE,
    HELLO_PAGE_ROUTE,
    HELLO_ASYNC_PAGE_ROUTE,
    helloEndpointRoute,
} from '../shared/routes'

import renderApp from './render-app'


export default (app) => {
    app.get(HOME_PAGE_ROUTE, (req,res) => {
        res.send(renderApp(req.url, homePage()))
    })

    app.get(HELLO_PAGE_ROUTE, (req, res) => {
        res.send(renderApp(req.url, helloPage()))
    })

    app.get(HELLO_ASYNC_PAGE_ROUTE, (req, res) => {
        res.send(renderApp(req.url, helloAsyncPage()))
    })

    app.get(helloEndpointRoute(), (req, res) => {
        res.json(helloEndpoint(req.params.num))
    })

    app.get('/500', () => {
        throw Error('Fake Internal Server Error')
    })

    app.get('*', (req, res) => {
        res.status(404).send(renderApp(req.url))
    })

    app.use((err, req, res, next) => {
        console.log(err.stack)
        res.status(500).send('Something went wrong!')
    })
}
