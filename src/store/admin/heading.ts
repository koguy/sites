import { Reducer } from "redux";
import {Types} from './cnst';
import {Heading} from '../../models/Heading';


export namespace IActions{
    export interface IFetchList {
        type: 'A_FETCH_HEADING_LIST',
        headingList: Array<Heading>
    }
}

export namespace Actions {
    export const fetchList = (headingList: Array<Heading>): IActions.IFetchList => {
        return {
            type: Types.A_FETCH_HEADING_LIST,
            headingList
        }
    }

	export const actionCreators = {
        fetchHeadingList:() => (dispatch) => {
            fetch("http://localhost:5000/api/heading", {
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

type KnowAction = IActions.IFetchList;

export const adminHeadingListReducer: Reducer<Array<Heading>> = (state: Array<Heading> = Array<Heading>(), action: KnowAction) => {
	switch (action.type) {
        case Types.A_FETCH_HEADING_LIST:
            return action.headingList;
		default:
			return state;
	}
}