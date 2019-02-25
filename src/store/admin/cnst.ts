export const Statuses = {
	isLoading: "isLoading",
	loaded: "loaded",
	isSaving: "isSaving",
	saved: "saved",
	isCreating: "isCreating",
	created: "created",
	deleted: "deleted",
	updated: "updated",
    isUpdating: "isUpdating",
    none: "none",
    set: "set",
    isLoggingIn: "isLoggingIn",
    loggedIn: "loggedIn",
    loginFailed: "loginFailed",
    notAuthorized:  "notAuthorized"
}

export namespace Types {
    export const A_SET_STATUS = "A_SET_STATUS";

    export const A_FETCH_SITES_LIST = "A_FETCH_SITES_LIST";
    export const A_FETCH_SITES_LIST_BY_HEADING = "A_FETCH_SITES_LIST_BY_HEADING";
	export const A_FETCH_SITE = "A_FETCH_SITE";
	export const A_VIEW_SITE_REQUESTED = "A_VIEW_SITE_REQUESTED";
    export const A_UPDATE_SITE = "A_UPDATE_SITE";
    export const A_CREATE_SITE = "A_CREATE_SITE";
    export const A_SITE_IN_PROCESS = "A_SITE_IN_PROCESS";
    export const A_LIST_IN_PROCESS = "A_LIST_IN_PROCESS";
    export const A_SET_CURRENT_SITE = "A_SET_CURRENT_SITE";
    export const A_DELETE_SITE = "A_DELETE_SITE";
    export const A_CLEAR_CURRENT_SITE = "A_CLEAR_CURRENT_SITE";
    export const A_GET_SITE = "A_GET_SITE";

    export const A_FETCH_HEADING_LIST = "A_FETCH_HEADING_LIST";

    export namespace alert {
        export const SUCCESS = "ALERT_SUCCESS";
        export const ERROR = "ALERT_ERROR";
        export const CLEAR = "ALERT_CLEAR";
    };
    
    export namespace user {
        export const LOGIN_REQUEST = "USERS_LOGIN_REQUEST";
        export const LOGIN_SUCCESS = "USERS_LOGIN_SUCCESS";
        export const LOGIN_FAILURE = "USERS_LOGIN_FAILURE";

        export const LOGOUT = "USERS_LOGOUT";

        export const GETALL_REQUEST = "USERS_GETALL_REQUEST";
        export const GETALL_SUCCESS = "USERS_GETALL_SUCCESS";
        export const GETALL_FAILURE = "USERS_GETALL_FAILURE";
    };
    
    
}