import 'babel-polyfill';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducers/dog_reducers';
import BarkMessage from './containers/bark_message';
import BarkButton from './containers/bark_button';

const store = createStore(combineReducers({
    dog: dogReducer,
}));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <BarkMessage />
            <BarkButton />
        </div>
    </Provider>
    , document.getElementById('app'));
