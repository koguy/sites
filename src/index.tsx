import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { configureStore, IApplicationState } from './store';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({basename: baseUrl || undefined});

const initialState = (window as any).initialReduxState as IApplicationState;
const {store, persistor} = configureStore(history, initialState);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor} >
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();




