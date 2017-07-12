// @flow

import React from 'react'

const FollowOthers = () =>
  (<div className="container">
    <div className="header">
      <h2>Who to follow</h2><a href="#12" className="refresh">Refresh</a>
    </div>
    <ul className="suggestions">
      <li className="suggestion1">
        <img />
        <a href="#12" target="_blank" className="username">this will not be displayed</a>
        <a href="#12" className="close close1">x</a>
      </li>
      <li className="suggestion2">
        <img />
        <a href="#12" rel='noopener noreferer' target="_blank" className="username">neither this</a>
        <a href="#12" className="close close2">x</a>
      </li>
      <li className="suggestion3">
        <img />
        <a href="#12" target="_blank" className="username">nor this</a>
        <a href="#12" className="close close3">x</a>
      </li>
    </ul>
  </div>)

export default FollowOthers
