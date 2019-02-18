import {combineReducers, applyMiddleware, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {createBrowserHistory} from 'history';
import {ISitesState, reducer as adminSitesReducer, currentIdReducer} from './admin/sites';
import {sitesReducer} from './sites';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {reducer as categoryListReducer, categoryIdReducer, categoryReducer} from './category';
import {headingIdReducer, headingReducer} from './heading';
import {adminHeadingListReducer} from './admin/heading';
import {Category} from '../models/Category';
import {Heading} from '../models/Heading';
import {Sites} from '../models/Sites';
import storageSession from 'redux-persist/lib/storage/session';

declare global {
    interface Window { devToolsExtension: never; }
}

export interface IApplicationState {
    a_sites: ISitesState,
    a_headingList: Array<Heading>,
    a_currentSiteId: number,

    sites: Array<Sites>,

    categoryList: Array<Category>,
    category: Category,
    categoryId: number,
    
    heading: Heading,
    headingId: number
}

//export function configureStore(history: History<any>, initialState: IApplicationState) {
export function configureStore() {

    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const history = createBrowserHistory({basename: baseUrl || undefined});
    
    const persistConfig = {
        key: 'root',
        storage: storageSession,
        whitelist: ['currentSiteId', 'categoryId', 'headingId']
    }
    
    const reducers = {
        a_sites: adminSitesReducer,
        a_headingList: adminHeadingListReducer,
        a_currentSiteId: currentIdReducer,

        sites: sitesReducer,

        categoryList: categoryListReducer,
        category: categoryReducer,
        categoryId: categoryIdReducer,

        heading: headingReducer,
        headingId: headingIdReducer
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
