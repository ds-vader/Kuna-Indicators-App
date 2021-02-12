import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import indicatorReducer from './indicator-reducer';

let reducers = combineReducers({
    indicatorsPage: indicatorReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;