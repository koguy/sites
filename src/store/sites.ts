import { Reducer } from "redux";
import {Sites} from '../models/Sites';
import {Map} from 'immutable';

export interface ISitesListState {
    status: string,
    data: Map<number, Sites>
}
export interface ICurrentSiteState {
    status: string,
    data: Sites
}

export interface ISitesState {
    sites: ISitesListState,
    currentSite: ICurrentSiteState
}

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
    none: "none"
}

export namespace Types {
    export const FETCH_SITES_LIST = "FETCH_SITES_LIST";
	export const FETCH_SITE = "FETCH_SITE";
	export const VIEW_SITE_REQUESTED = "VIEW_SITE_REQUESTED";
    export const UPDATE_SITE = "UPDATE_SITE";
    export const CREATE_SITE = "CREATE_SITE";
    export const SITE_IN_PROCESS = "SITE_IN_PROCESS";
    export const LIST_IN_PROCESS = "LIST_IN_PROCESS";
    export const SET_CURRENT = "SET_CURRENT";
}

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_SITES_LIST',
        sitesList: Map<number, Sites>
    }
    export interface ICreate {
        type: 'CREATE_SITE',
        site: Sites
    }
    export interface ISetCurrentSite {
        type: 'SET_CURRENT',
        siteId: number
    }
    export interface ISiteInProcess {
        type: 'SITE_IN_PROCESS',
        status: string
    }
    export interface IListInProcess {
        type: 'LIST_IN_PROCESS',
        status: string
    }
}

export namespace Actions {

    export const fetchList = (sitesList: Map<number, Sites>): IActions.IFetchList => {
        return {
            type: Types.FETCH_SITES_LIST,
            sitesList
        }
    }
	export const create = (newSite: Sites): IActions.ICreate => {
		return {
			type: Types.CREATE_SITE,
			site: newSite
		}
    }
    export const setCurrent = (siteId: number): IActions.ISetCurrentSite => {
        return {
            type: Types.SET_CURRENT,
            siteId
        }
    }
    export const siteInProcess = (status: string): IActions.ISiteInProcess => {
        return {
            type: Types.SITE_IN_PROCESS,
            status
        }
    }
    export const listInProcess = (status: string): IActions.IListInProcess => {
        return {
            type: Types.LIST_IN_PROCESS,
            status
        }
    }

	export const actionCreators = {
        fetchList:() => (dispatch) => {
            dispatch(listInProcess(Statuses.isLoading));
            fetch("http://localhost:5000/api/sites", {
                method: "GET",
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data)
                        dispatch(fetchList(data));
                })
                .catch(error =>
                    console.error("An error occured while PUT"));
        },
        create: (site) => (dispatch) => {
            dispatch(siteInProcess(Statuses.isCreating));
            fetch("http://localhost:5000/api/sites", {
                method: "POST",
                headers: new Headers({
                    "accept": "application/json",
                    "content-type": "application/json"
                }),
                body: JSON.stringify(site)
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data)
                        dispatch(create(data));
                })
                .catch(error =>
                    console.error("An error occured while PUT"));
        },
        setCurrent: (siteId: number) => (dispatch) => {
            dispatch(setCurrent(siteId));
        }
	}
}

const initialState: ISitesState = {
    sites: {
        status: Statuses.none,
        data: Map<number, Sites>()
    },
    currentSite: {
        status: Statuses.none,
        data: new Sites()
    }
}

type KnowAction = IActions.IFetchList | IActions.ICreate | IActions.ISiteInProcess | IActions.IListInProcess | IActions.ISetCurrentSite;

export const reducer: Reducer<ISitesState> = (state: ISitesState = initialState, action: KnowAction) => {
	switch (action.type) {
        case Types.FETCH_SITES_LIST:
            return {
                ...state,
                sites: {
                    status: Statuses.loaded,
                    data: action.sitesList
                }
            }
		case Types.CREATE_SITE:
			return {
                ...state,
                sites: {
                    status: Statuses.created,
                    data: state.sites.data.set(action.site.id, action.site)
                }
            }
        case Types.SET_CURRENT:
            return {
                ...state,
                currentSite: {
                    ...state.currentSite,
                    data: { ...state.sites.data.find(o => o.id == action.siteId)} as Sites
                }
            }
        case Types.SITE_IN_PROCESS:
            return {
                ...state,
                currentSite: {
                    ...state.currentSite,
                    status: action.status,
                }
            }
        case Types.LIST_IN_PROCESS:
            return {
                ...state,
                sites: {
                    ...state.sites,
                    status: action.status,
                }
            }
		default:
			return state;
	}
}