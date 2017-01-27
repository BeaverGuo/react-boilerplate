import Immutable from 'immutable';
import { MAKE_BARK } from '../actions/dog_actions';

const initialState = Immutable.Map({
    hasBarked: false,
});

const dogReducer = ( state = initialState, action) => {
    switch (action.type) {
        case MAKE_BARK:
            return state.set('hasBarked', action.payload);
        default:
            return state;
    }
}

export default dogReducer;