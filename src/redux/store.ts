import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from 'redux-thunk';
import newsReducer, { NewsState } from "./newsReducer";
import newsPageReducer, { NewsPageState } from "./newsPageReducer";

export type ActionType<K, V = void> = V extends void ? {type: K} : {type: K} & V;

const rootReducer = combineReducers({
    news: newsReducer,
    page: newsPageReducer
})

export interface StoreState {
    news: NewsState
    page: NewsPageState
}

const store = createStore(rootReducer, applyMiddleware(Thunk))
// window['store'] = store;

export default store;