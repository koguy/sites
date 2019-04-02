import {Sites} from '../models/Sites';
import {Reducer} from 'redux';
import {Types} from './types';

export enum FilterType {
    byTag='byTag',
    bySearch='bySearch',
    byHeading='heading',
    recent='recent',
}

export interface IFilterState {
    title: string,
    value: string,
    type: FilterType
}

export namespace IActions{
    export interface ISetFilter {
        type: 'SET_FILTER',
        filterState: IFilterState
    }
}

export namespace Actions {

    export const setFilter = (filterState: IFilterState): IActions.ISetFilter => {
        return {
            type: Types.SET_FILTER,
            filterState
        }
    }

    export const actionCreators = {

        setFilter:(filterState: IFilterState) => (dispatch) => {
            dispatch(setFilter(filterState));
        }
    }
}

const initialState: IFilterState = {
    title: "Недавно добавленные",
    value: "",
    type: FilterType.recent
}

type KnowAction = IActions.ISetFilter;

export const filterReducer: Reducer<IFilterState> = (state: IFilterState = initialState , action: KnowAction) => {
    switch (action.type) {
        case Types.SET_FILTER: {
            switch (action.filterState.type) {
                case FilterType.bySearch:
                case FilterType.byTag:
                    return {
                        ...action.filterState,
                        title: action.filterState.value,
                    };
                case FilterType.byHeading:
                    return action.filterState;
                case FilterType.recent:
                    return {
                        ...action.filterState,
                        title: "Недавно добавленные"
                    }
                default:
                    return state;
            }
        }
        default:
            return state;
    }
}