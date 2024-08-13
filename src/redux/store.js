import {legacy_createStore as createStore} from 'redux';
import data from '../utils/data.json';
import rootReducer from './reducers';

const initialState = {
    categories: data.categories,
}

const store = createStore(rootReducer, initialState);

export default store