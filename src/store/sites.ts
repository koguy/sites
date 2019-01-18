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
    list: ISitesListState,
    current: ICurrentSiteState,
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
    none: "none",
    set: "set"
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
    export const DELETE_SITE = "DELETE_SITE";
    export const CLEAR_CURRENT = "CLEAR_CURRENT";
}

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_SITES_LIST',
        sitesList: Array<Sites>
    }
    export interface ICreate {
        type: 'CREATE_SITE',
        site: Sites
    }
    export interface ISetCurrentSite {
        type: 'SET_CURRENT',
        siteId: number
    }
    export interface IUpdate {
        type: 'UPDATE_SITE',
        site: Sites
    }
    export interface IDelete {
        type: 'DELETE_SITE',
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
    export interface IClearCurrent {
        type: 'CLEAR_CURRENT',
    }
}

export namespace Actions {

    export const fetchList = (sitesList: Array<Sites>): IActions.IFetchList => {
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
    export const update = (site: Sites): IActions.IUpdate => {
        return {
            type: Types.UPDATE_SITE,
            site
        }
    }
    export const deleteSite = (siteId: number): IActions.IDelete => {
        return {
            type: Types.DELETE_SITE,
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
    export const clearCurrent = (): IActions.IClearCurrent => {
        return {
            type: Types.CLEAR_CURRENT
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
                method: "PUT",
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
                    if (data) {
                        dispatch(create(data));
                        //dispatch(setCurrent(data.id));
                    }
                })
                .catch(error =>
                    console.error("An error occured while PUT"));
        },
        setCurrent: (siteId: number) => (dispatch) => {
            dispatch(setCurrent(siteId));
        },
        clearCurrent: () => (dispatch) => {
            dispatch(clearCurrent());
        },
        update: (site) => (dispatch) => {
            dispatch(siteInProcess(Statuses.isUpdating));
            fetch("http://localhost:5000/api/sites/" + site.id.toString() , {
                method: "POST",
                headers: new Headers({
                    "accept": "application/json",
                    "content-type": "application/json"
                }),
                body: JSON.stringify(site)
            })
            .then(response => {
                if (response.ok)
                    return response.json();
            })
            .then(data => {
                if (data) {
                    dispatch(update(data));
                    //dispatch(setCurrent(data.id));
                }
            });
            //.catch(error =>
              //  console.error("An error occured while POST"));
        },
        delete: (siteId) => (dispatch) => {
            fetch("http://localhost:5000/api/sites/" + siteId.toString(), {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    dispatch(deleteSite(siteId));
                    dispatch(clearCurrent());
                }
            });
        }
	}
}

const initialState: ISitesState = {
    list: {
        status: Statuses.none,
        data: Map<number, Sites>()
    },
    current: {
        status: Statuses.none,
        data: new Sites()
    }
};

function convertToImmutableMap(sites: Array<Sites>): Map<number, Sites> {
    let sitesMap = Map<number, Sites>();
    sites.forEach(value => {
        sitesMap = sitesMap.set(value.id, value);
    });
    return sitesMap;
}

type KnowAction = IActions.IFetchList | IActions.ICreate | IActions.ISiteInProcess | IActions.IListInProcess | IActions.ISetCurrentSite | IActions.IUpdate 
                    | IActions.IDelete | IActions.IClearCurrent;

export const reducer: Reducer<ISitesState> = (state: ISitesState = initialState, action: KnowAction) => {
	switch (action.type) {
        case Types.FETCH_SITES_LIST:
            return {
                ...state,
                list: {
                    status: Statuses.loaded,
                    data: convertToImmutableMap(action.sitesList)
                }
            }
		case Types.CREATE_SITE:
			return {
                ...state,
                list: {
                    ...state.list,
                    data:  state.list.data.set(action.site.id, action.site)
                },
                current: {
                    status: Statuses.created,
                    data: action.site
                }
            }
        case Types.SET_CURRENT:
            return {
                ...state,
                current: {
                    status: Statuses.set,
                    data: state.list.data.get(action.siteId) as Sites
                }
            }
        case Types.CLEAR_CURRENT:
            return {
                ...state,
                current: {
                    status: Statuses.none,
                    data: new Sites()
                }
            }
        case Types.UPDATE_SITE:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.set(action.site.id, action.site)
                },
                current: {
                    status: Statuses.updated,
                    data: action.site
                }
            }
        case Types.DELETE_SITE:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.remove(action.siteId)
                },
            }
        case Types.SITE_IN_PROCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    status: action.status,
                }
            }
        case Types.LIST_IN_PROCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    status: action.status,
                }
            }
		default:
			return state;
	}
}