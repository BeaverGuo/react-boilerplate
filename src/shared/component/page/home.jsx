// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_NAME } from '../../config'

const title = 'Home Page'

const HomePage = () =>
  (<div>
    <button onClick={handleClick}>Click me!</button>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <h1>{title}</h1>
  </div>)

export default HomePage
