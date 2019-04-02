import { Reducer } from "redux";
import {Types} from './types';
import {Heading} from '../models/Heading';

export namespace IActions{
    export interface IGetHeading {
        type: 'FETCH_HEADING_LIST',
        headingList: Array<Heading>
    }
}

export namespace Actions {
    export const fetchHeadingList = (headingList: Array<Heading>): IActions.IGetHeading => {
        return {
            type: Types.FETCH_HEADING_LIST,
            headingList
        }
    }

	export const actionCreators = {
        fetchHeadingList:() => (dispatch) => {
            fetch("http://localhost:5000/api/heading", {
                method: "GET"
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data)
                    dispatch(fetchHeadingList(data));
            })
            .catch(error =>
                console.error("An error occured while GET"));
        }
	}
}

export const headingListReducer: Reducer<Array<Heading>> = (state: Array<Heading> = new Array<Heading>(), action: IActions.IGetHeading) => {
	switch (action.type) {
        case Types.FETCH_HEADING_LIST:
            return action.headingList;
        default:
			return state;
	}
}