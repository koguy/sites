import {combineReducers, applyMiddleware, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {History} from 'history';
import {ISitesState, reducer} from './sites';
import {composeWithDevTools} from 'redux-devtools-extension';

declare global {
    interface Window { devToolsExtension: never; }
}

export interface IApplicationState {
    sites: ISitesState
}

export function configureStore(history: History<any>, initialState: IApplicationState) {
    const reducers = {
        sites: reducer
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // const enhancers = [];
    // const isDevelopment = process.env.NODE_ENV === 'development';
    // if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    //     enhancers.push(window.devToolsExtension);
    // }

    const rootReducer = combineReducers({
        ...reducers, 
        router: connectRouter(history)
    });

    return createStore(
        rootReducer,
//        compose(applyMiddleware(...middleware), ...enhancers)
        composeWithDevTools(applyMiddleware(...middleware))
    );
}
