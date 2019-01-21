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
    set: "set"
}

export namespace Types {
    export const SET_STATUS = "SET_STATUS";

    export const FETCH_SITES_LIST = "FETCH_SITES_LIST";
	export const FETCH_SITE = "FETCH_SITE";
	export const VIEW_SITE_REQUESTED = "VIEW_SITE_REQUESTED";
    export const UPDATE_SITE = "UPDATE_SITE";
    export const CREATE_SITE = "CREATE_SITE";
    export const SITE_IN_PROCESS = "SITE_IN_PROCESS";
    export const LIST_IN_PROCESS = "LIST_IN_PROCESS";
    export const SET_CURRENT = "SET_CURRENT";
    export const DELETE_SITE = "DELETE_SITE";
    export const CLEAR_CURRENT = "CLEAR_CURRENT";
    export const GET_SITE = "GET_SITE";

    export const FETCH_TYPE_OF_SITE_LIST = "FETCH_TYPE_OF_SITE_LIST";
}