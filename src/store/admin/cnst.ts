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
    
}