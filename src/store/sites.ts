import {Sites} from '../models/Sites';
import {Reducer} from 'redux';
import {Types} from './types';

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_SITES_LIST',
        sitesList: Array<Sites>
    }
    export interface IFetchListByHeading {
        type: 'FETCH_SITES_LIST_BY_HEADING',
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
    export const fetchListByHeading = (sitesList: Array<Sites>): IActions.IFetchListByHeading => {
        return {
            type: Types.FETCH_SITES_LIST_BY_HEADING,
            sitesList
        }
    }

    export const actionCreators = {

        fetchList:() => (dispatch) => {
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
                    console.error("An error occured while FETCH"));
        },
        fetchListByHeading: (headingId: number) => (dispatch) => {
            fetch("http://localhost:5000/api/sites/heading/" + headingId.toString(), {
                method: "GET",
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data)
                        dispatch(fetchListByHeading(data));
                })
                .catch(error =>
                    console.error("An error occured while FETCH"));
        }
    }
}

type KnowAction = IActions.IFetchList | IActions.IFetchListByHeading;

export const sitesReducer: Reducer<Array<Sites>> = (state: Array<Sites> = new Array<Sites>() , action: KnowAction) => {
    switch (action.type) {
        case Types.FETCH_SITES_LIST_BY_HEADING:
        case Types.FETCH_SITES_LIST:
            return action.sitesList;
        default:
            return state;
    }
}