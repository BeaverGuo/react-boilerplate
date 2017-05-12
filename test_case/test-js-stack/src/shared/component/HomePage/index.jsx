import React from 'react'
import Helmet from 'react-helmet'
import injectSheet from 'react-jss'

import ModalExample from '../modal-example'
import { APP_NAME } from '../../config'
import ReposList from '../ReposList'

const styles = {
  hoverMe: {
    '&:hover': {
      color: 'red',
    },
  },
  '@media (max-width: 800px)': {
    resizeMe: {
      color: 'red',
    },
  },
  specialButton: {
    composes: ['btn', 'btn-primary'],
    backgroundColor: 'limegreen',
  },
  form: {
    'margin-bottom': '1em',
  },
  input: {
    outline: 'none';
    'border-bottom': '1px dotted #999';
  }
}
const HomePage = ({ classes }) => {
    const { loading, error, repos } = this.props
    const reposListProps = {
      loading,
      error,
      repos,
    }
    return <div>
        <Helmet
            meta={[
                { name: 'description', content: 'Hello App is an app to say hello' },
                { property: 'og:title', content: APP_NAME },
            ]}
        />
        <div className="jumbotron">
      <div className="container">
        <h1 className="display-3 mb-4">{APP_NAME}</h1>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-md-4 mb-4">
          <h3 className="mb-3">Bootstrap</h3>
          <p>
            <button type="button" role="button" data-toggle="modal" data-target=".js-modal-example" className="btn btn-primary">Open Modal</button>
          </p>
        </div>
        <div className="col-md-4 mb-4">
          <h3 className="mb-3">JSS </h3>
        </div>
        <div className="col-md-4 mb-4">
          <Section>
            <h2>
              Try me!
            </h2>
            <form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form>
            <ReposList {...reposListProps} />
          </Section>
        </div>

        <div className="col-md-4 mb-4">
    <h3 className="mb-3">JSS</h3>
    <p className={classes.hoverMe}>Hover me.</p>
    <p className={classes.resizeMe}>Resize the window.</p>
    <button className={classes.specialButton}>Composition</button>
  </div>
      </div>
    </div>
    <ModalExample />
    </div>
}

export default injectSheet(styles)(HomePage)
