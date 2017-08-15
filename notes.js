// 2017-07-01 notes

// Render to dom
window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter> {/*this make url after localhost:8080 hash router. `eg:localhost:8080/#/communications` */}
        <PageWrapper>
          <Switch>
            <Route    path="/system"                                              component={SystemManagerPage} />
            <Route    path="/communications/:communicationType/:communicationId"  component={CommunicationPage} />
            <Route    path="/communications/:communicationType"                   component={CommunicationPage} />
            <Redirect from="/communications"                                      to="/communications/discussions" />
            <Redirect from="/"                                                    to="/communications" />
          </Switch>
        </PageWrapper>
      </HashRouter>
    </Provider>,
    window.document.getElementById('react-content')
  );
};

HashRouter
// base url should have a leading slash
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">

//enhance component use recompose

/* @flow */
import { compose, mapProps, lifecycle } from 'recompose';
import path from 'path';

import { connectCommunicationsSearch, connectCreateCommunication } from '../../communication';
import { removeReactRouterProps } from '../../core';

export default compose(
  connectCommunicationsSearch,
  connectCreateCommunication,
  mapProps(({ match, ...otherProps }) => ({
    match,
    getHref(communicationId: number, tab: string): string {
      return path.join('/communications', match.params.communicationType, `${communicationId}`, tab);
    },
    ...otherProps,
  })),
  lifecycle({
    componentDidMount() {
      const { match: { params }, results, selectCommunication } = this.props;
      const communicationId = parseInt(params.communicationId);

      if(results.length > 0 && !isNaN(communicationId)) {
        selectCommunication(communicationId);
      }
    },
    componentWillReceiveProps(nextProps: Object) {
      const {
        results,
        newCommunication,
        selectedCommunicationId,
        selectCommunication,
        deselectCommunication,
        closeNewCommunication,
        getHref,
        match,
        history,
      } = nextProps;

      // Check if url will change
      const communicationId = parseInt(match.params.communicationId);
      if(results.length === 0 || isNaN(communicationId))    deselectCommunication();
      else if(communicationId !== selectedCommunicationId)  selectCommunication(communicationId);

      // Check if new communication has finshed being created
      if(newCommunication && newCommunication.id) {
        closeNewCommunication();
        history.push(getHref(newCommunication.id, 'details'));
      }
    },
  }),
  mapProps(({ deselectCommunication, ...otherProps }) => otherProps),
  removeReactRouterProps,
);



//HOC
const composedHoc = compose(hoc1, hoc2, hoc3)

// Same as
const composedHoc = BaseComponent => hoc1(hoc2(hoc3(BaseComponent)))

mapProps(
  propsMapper: (ownerProps: Object) => Object,
): HigherOrderComponent
Accepts a function that maps owner props to a new collection of props that are passed to the base component.

mapProps() pairs well with functional utility libraries like lodash/fp. For example, Recompose does not come with a omitProps() function, but you can easily build one using lodash-fp's omit():

const omitProps = keys => mapProps(props => omit(keys, props))

// Because of currying in lodash-fp, this is the same as
const omitProps = compose(mapProps, omit)

