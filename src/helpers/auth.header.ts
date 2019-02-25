import {store} from '../index';

export function authHeader() {
    // return authorization header with jwt token
    var token = store.getState().token;

    if (token != null) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}