import {Sites} from '../models/Sites';
import {Reducer} from 'redux';
import {Types} from './types';
import {fetchAllSites} from '../helpers/allSites';

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_SITES_LIST',
        sitesList: Array<Sites>
    }
    export interface ISetList {
        type: 'SET_SITES',
        sitesList: Array<Sites>
    }
}

export namespace Actions {

    export const fetchList = (sitesList: Array<Sites>): IActions.IFetchList => {
        return {
            type: Types.FETCH_SITES_LIST,
            sitesList
        }
    }
    export const setList = (sitesList: Array<Sites>): IActions.ISetList => {
        return {
            type: Types.SET_SITES,
            sitesList
        }
    }

    export const actionCreators = {
        fetchList:() => (dispatch) => {
            fetchAllSites();
        },
        setList: (sitesList: Array<Sites>) => (dispatch) => {
            dispatch(setList(sitesList));
        }
    }
}

type KnowAction = IActions.ISetList; 

export const sitesReducer: Reducer<Array<Sites>> = (state: Array<Sites> = new Array<Sites>(), action: KnowAction) => {
    switch (action.type) {
        case Types.SET_SITES:
            return action.sitesList;
        default:
            return state;
    }
}

export const allSitesReducer: Reducer<Array<Sites>> = (state: Array<Sites> = new Array<Sites>(), action: IActions.IFetchList) => {
    switch (action.type) {
        case Types.FETCH_SITES_LIST:
            return action.sitesList;
        default:
            return state;
    }
}