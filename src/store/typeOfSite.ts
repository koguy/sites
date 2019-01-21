import { Reducer } from "redux";
import {Statuses, Types} from './cnst';
import {TypeOfSite} from '../models/TypeOfSite';

export interface ITypeOfSiteState {
    list: Array<TypeOfSite>,
    status: string
}

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_TYPE_OF_SITE_LIST',
        typeOfSiteList: Array<TypeOfSite>
    }
    export interface ISetStatus {
        type: 'SET_STATUS',
        status: string
    }
}

export namespace Actions {
    export const fetchList = (typeOfSiteList: Array<TypeOfSite>): IActions.IFetchList => {
        return {
            type: Types.FETCH_TYPE_OF_SITE_LIST,
            typeOfSiteList
        }
    }
    export const setStatus = (status: string): IActions.ISetStatus => {
        return {
            type: Types.SET_STATUS,
            status
        }
    }

	export const actionCreators = {
        fetchTypeOfSiteList:() => (dispatch) => {
            dispatch(setStatus(Statuses.isLoading));
            fetch("http://localhost:5000/api/typeOfSite", {
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
                    console.error("An error occured while FETCH"));
        }
	}
}

const initialState: ITypeOfSiteState = {
    list: [],
    status: Statuses.none
};

type KnowAction = IActions.IFetchList | IActions.ISetStatus;

export const reducer: Reducer<ITypeOfSiteState> = (state: ITypeOfSiteState = initialState, action: KnowAction) => {
	switch (action.type) {
        case Types.FETCH_TYPE_OF_SITE_LIST:
            return {
                list: action.typeOfSiteList,
                status: Statuses.loaded
            }
        case Types.SET_STATUS: 
            return {
                ...state,
                status: action.status
            }
		default:
			return state;
	}
}