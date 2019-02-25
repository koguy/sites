import { Reducer } from "redux";
import {Sites} from '../../models/Sites';
import {Map} from 'immutable';
import {Statuses, Types} from './cnst';
import {authHeader} from '../../helpers/auth.header';

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

export namespace IActions{
    export interface IFetchList {
        type: 'A_FETCH_SITES_LIST',
        sitesList: Array<Sites>
    }
    export interface IGet {
        type: 'A_GET_SITE',
        site: Sites
    }
    export interface ICreate {
        type: 'A_CREATE_SITE',
        site: Sites
    }
    export interface IUpdate {
        type: 'A_UPDATE_SITE',
        site: Sites
    }
    export interface IDelete {
        type: 'A_DELETE_SITE',
        siteId: number
    }
    export interface ISetCurrentSite {
        type: 'A_SET_CURRENT_SITE',
        siteId: number,
        status: string | null
    }
    export interface IClearCurrent {
        type: 'A_CLEAR_CURRENT_SITE',
    }
    export interface ISiteInProcess {
        type: 'A_SITE_IN_PROCESS',
        status: string
    }
    export interface IListInProcess {
        type: 'A_LIST_IN_PROCESS',
        status: string
    }
}

export namespace Actions {

    export const fetchList = (sitesList: Array<Sites>): IActions.IFetchList => {
        return {
            type: Types.A_FETCH_SITES_LIST,
            sitesList
        }
    }
    export const get = (site: Sites): IActions.IGet => {
        return {
            type: Types.A_GET_SITE,
            site
        }
    }
	export const create = (newSite: Sites): IActions.ICreate => {
		return {
			type: Types.A_CREATE_SITE,
			site: newSite
		}
    }
    export const update = (site: Sites): IActions.IUpdate => {
        return {
            type: Types.A_UPDATE_SITE,
            site
        }
    }
    export const deleteSite = (siteId: number): IActions.IDelete => {
        return {
            type: Types.A_DELETE_SITE,
            siteId
        }
    }
    export const setCurrent = (siteId: number, status?: string | null): IActions.ISetCurrentSite => {
        return {
            type: Types.A_SET_CURRENT_SITE,
            siteId,
            status
        }
    }
    export const clearCurrent = (): IActions.IClearCurrent => {
        return {
            type: Types.A_CLEAR_CURRENT_SITE
        }
    }
    export const siteInProcess = (status: string): IActions.ISiteInProcess => {
        return {
            type: Types.A_SITE_IN_PROCESS,
            status
        }
    }
    export const listInProcess = (status: string): IActions.IListInProcess => {
        return {
            type: Types.A_LIST_IN_PROCESS,
            status
        }
    }

	export const actionCreators = {
        fetchList:() => (dispatch) => {
            dispatch(listInProcess(Statuses.isLoading));
            fetch("http://localhost:5000/api/sites/a", {
                method: "GET",
                headers: authHeader()
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data)
                        dispatch(fetchList(data));
                })
                .catch(error =>
                    console.error("An error occured while FETCH"));
        },
        get:(siteId: number) => (dispatch) => {
            fetch("http://localhost:5000/api/sites/" + siteId.toString(), {
                method: "GET"
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data) {
                        dispatch(get(data));
                    }
                })
                .catch(error =>
                    console.error("An error occured while GET"));
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
                        dispatch(setCurrent(data.id, Statuses.created));
                    }
                })
                .catch(error =>
                    console.error("An error occured while PUT"));
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
                    dispatch(setCurrent(data.id, Statuses.updated));
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
        },
        setCurrent: (siteId: number) => (dispatch) => {
            dispatch(setCurrent(siteId));
        },
        clearCurrent: () => (dispatch) => {
            dispatch(clearCurrent());
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

type KnowAction = IActions.IFetchList | IActions.IGet | IActions.ICreate | IActions.ISiteInProcess | IActions.IListInProcess | IActions.ISetCurrentSite | IActions.IUpdate 
                    | IActions.IDelete | IActions.IClearCurrent;

export const reducer: Reducer<ISitesState> = (state: ISitesState = initialState, action: KnowAction) => {
	switch (action.type) {
        case Types.A_FETCH_SITES_LIST:
            return {
                ...state,
                list: {
                    status: Statuses.loaded,
                    data: convertToImmutableMap(action.sitesList)
                }
            }
        case Types.A_GET_SITE:
			return {
                ...state,
                current: {
                    status: Statuses.loaded,
                    data:  action.site
                }
            }
		case Types.A_CREATE_SITE:
			return {
                ...state,
                list: {
                    ...state.list,
                    data:  state.list.data.set(action.site.id, action.site)
                }
            }
        case Types.A_UPDATE_SITE:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.set(action.site.id, action.site)
                }
            }
        case Types.A_DELETE_SITE:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.remove(action.siteId)
                },
            }
        case Types.A_SET_CURRENT_SITE:
            return {
                ...state,
                current: {
                    status: action.status || Statuses.set,
                    data: state.list.data.get(action.siteId) as Sites
                }
            }
        case Types.A_CLEAR_CURRENT_SITE:
            return {
                ...state,
                current: {
                    status: Statuses.none,
                    data: new Sites()
                }
            }
        case Types.A_SITE_IN_PROCESS:
            return {
                ...state,
                current: {
                    ...state.current,
                    status: action.status,
                }
            }
        case Types.A_LIST_IN_PROCESS:
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

export const currentIdReducer: Reducer<number> = (state: number = 0, action: KnowAction) => {
    switch (action.type) {
        case Types.A_SET_CURRENT_SITE:
            return action.siteId;
        case Types.A_CLEAR_CURRENT_SITE:
            return 0;
        default:
			return state;
    }
}