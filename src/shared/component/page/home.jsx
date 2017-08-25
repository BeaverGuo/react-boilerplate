// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { DateRangePicker} from 'react-dates'
// import 'react-dates/lib/css/_datepicker.css'
import style from './style.css'

import { APP_NAME } from '../../config'

const title = 'Home Page'

const HomePage = () =>
  (<div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
      ]}
    />
    <h1>{title}</h1>
    <p className='p'>test css loader</p>
  </div>)

export default HomePage
