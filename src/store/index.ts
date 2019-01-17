import {combineReducers, applyMiddleware, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {History} from 'history';
import {ISitesState, reducer as sitesReducer} from './sites';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

declare global {
    interface Window { devToolsExtension: never; }
}

export interface IApplicationState {
    sites: ISitesState
}

export function configureStore(history: History<any>, initialState: IApplicationState) {
    
    const persistConfig = {
        key: 'root',
        storage
    }
    
    const reducers = {
        sites: sitesReducer
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

    //const persistedReducer = persistReducer(persistConfig, rootReducer);

    
    let store = createStore(
        rootReducer,
        //compose(applyMiddleware(...middleware), ...enhancers)
        composeWithDevTools(applyMiddleware(...middleware)));
    let persistor = persistStore(store);
 
    return {store, persistor};
}
