import {combineReducers, applyMiddleware, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {sitesReducer, allSitesReducer} from './sites';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {reducer as categoryListReducer} from './category';
import {headingListReducer} from './heading';
import {Category} from '../models/Category';
import {Heading} from '../models/Heading';
import {Sites} from '../models/Sites';
import storageSession from 'redux-persist/lib/storage/session';
import {filterReducer, IFilterState} from './filter';

declare global {
    interface Window { devToolsExtension: never; }
}

export interface IApplicationState {
    sites: Array<Sites>,
    allSites: Array<Sites>,

    categoryList: Array<Category>,
    
    filter: IFilterState
}

//export function configureStore(history: History<any>, initialState: IApplicationState) {
export function configureStore() {

    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const history = createBrowserHistory({basename: baseUrl || undefined});
    
    const persistConfig = {
        key: 'root',
        storage: storageSession,
        whitelist: ['headingId', 'filter']
    }
    
    const reducers = {
        sites: sitesReducer,
        allSites: allSitesReducer,

        categoryList: categoryListReducer,

        filter: filterReducer
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

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    
    let store = createStore(
        persistedReducer,
        //compose(applyMiddleware(...middleware), ...enhancers)
        composeWithDevTools(applyMiddleware(...middleware)));
    let persistor = persistStore(store);
 
    return {store, persistor};
}
