// @flow

// deal with requests and responses. The calls to business logic are externalized
// to a different controller module

/* Note: You will find a lot of React Router examples using * as the route on
the server, leaving the entire routing handling to React Router. Since all requests
go through the same function, that makes it inconvenient to implement MVC-style pages.
Instead of doing that, we're here explicitly declaring the routes and their dedicated responses
to be able to fetch data from the database and pass it to a given page easily.
*/

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

export default (app: Object) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
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

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
