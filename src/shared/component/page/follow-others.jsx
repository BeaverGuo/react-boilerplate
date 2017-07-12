// @flow

import React from 'react'
import Helmet from 'react-helmet'

import FollowOthers from '../../container/follow-others'

const title = 'Follow others Page'

const FollowOthersPage = () =>
  (<div>
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A page to follow others' },
        { property: 'og:title', content: title },
      ]}
    />
    <h1>{title}</h1>
    <FollowOthers />
  </div>)

export default FollowOthersPage
