import {Reducer} from 'redux';
import {Types, Statuses} from './cnst';
import {history} from '../../index'

export namespace IActions {
    export interface ILoginRequest {
        type: 'USERS_LOGIN_REQUEST',
    }
    export interface ILoginSuccess {
        type: 'USERS_LOGIN_SUCCESS',
        token: string
    }
    export interface ILoginFailure {
        type: 'USERS_LOGIN_FAILURE'
    }
    export interface ILogout {
        type: 'USERS_LOGOUT'
    }
}

export namespace Actions {
    export const loginRequest = (): IActions.ILoginRequest => {
        return {
            type: Types.user.LOGIN_REQUEST,
        }
    }
    export const loginSuccess = (token: string): IActions.ILoginSuccess => {
        return {
            type: Types.user.LOGIN_SUCCESS,
            token
        }
    }
    export const loginFailure = (): IActions.ILoginFailure => {
        return {
            type: Types.user.LOGIN_FAILURE
        }
    }
    export const logout = (): IActions.ILogout => {
        return {
            type: Types.user.LOGOUT
        }
    }

    export const actionCreation = {
        login: (username, password) => (dispatch) => {
            dispatch(loginRequest());
            fetch('http://localhost:5000/api/users/authenticate', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password})
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 400) {
                        // auto logout if 401 response returned from api
                        dispatch(logout());
                        //location.reload(true);
                    }
                    const error = response.text() || response.statusText;
                    return Promise.reject(error);
                }
                return response.text();
            })
            .then(
                token => {
                    dispatch(loginSuccess(token));
                    history.push('/sites');
                },
                error => {
                    dispatch(loginFailure());
                }
            );
        },
        logout: () => (dispatch) => {
            dispatch(logout());
        }
    }
}

export interface IAuthState {
    status: string 
}
const initialState: IAuthState = {
    status: Statuses.notAuthorized
}

type KnownActions = IActions.ILoginSuccess | IActions.ILoginFailure | IActions.ILoginRequest | IActions.ILogout;

export const authReducer: Reducer<IAuthState> = (state:IAuthState = initialState, action: KnownActions) => {
    switch(action.type) {
        case Types.user.LOGIN_REQUEST:
            return {status: Statuses.isLoggingIn};
        case Types.user.LOGIN_SUCCESS:
            return {status: Statuses.loggedIn};
        case Types.user.LOGIN_FAILURE:
            return {status: Statuses.loginFailed};
        case Types.user.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export const tokenReducer: Reducer<string> = (state:string = null, action: KnownActions) => {
    switch(action.type) {
        case Types.user.LOGIN_SUCCESS:
            return action.token;
        case Types.user.LOGIN_FAILURE:
        case Types.user.LOGOUT:
            return null;
        default:
            return state;
    }
}
