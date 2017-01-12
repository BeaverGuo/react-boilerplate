import 'babel-polyfill';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import dogReducer from './reducers/dog-reducer';
import BarkMessage from './containers/bark-message';
import BarkButton from './containers/bark-button';

const store = createStore(combineReducers({
    dog: dogReducer,
}));

ReactDOM.render(
    <Provider store={store}>
        <div>
        <span>somehing</span>
            <BarkMessage />
            <BarkButton />
        </div>
    </Provider>
    ,document.getElementById('app')
);
