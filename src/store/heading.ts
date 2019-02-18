import { Reducer } from "redux";
import {Types} from './types';
import {Heading} from '../models/Heading';

export namespace IActions{
    export interface IGetHeading {
        type: 'GET_HEADING',
        heading: Heading
    }
    export interface ISetCurrentHeading {
        type: 'SET_CURRENT_HEADING',
        heading: Heading
    }
    export interface IClearCurrentHeading {
        type: 'CLEAR_CURRENT_HEADING'
    }
}

export namespace Actions {
    export const get = (heading: Heading): IActions.IGetHeading => {
        return {
            type: Types.GET_HEADING,
            heading
        }
    }
    export const setCurrentHeading = (heading: Heading): IActions.ISetCurrentHeading => {
        return {
            type: Types.SET_CURRENT_HEADING,
            heading
        }
    }
    export const clearCurrentHeading = (): IActions.IClearCurrentHeading => {
        return {
            type: Types.CLEAR_CURRENT_HEADING
        }
    }

	export const actionCreators = {
        get:(id: number) => (dispatch) => {
            fetch("http://localhost:5000/api/heading/" + id.toString(), {
                method: "GET"
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data)
                    dispatch(get(data));
            })
            .catch(error =>
                console.error("An error occured while GET"));
        },
        setCurrentHeading:(heading: Heading) => (dispatch) => {
            dispatch(setCurrentHeading(heading));
        },
        clearCurrentHeading:() => (dispatch) => {
            dispatch(clearCurrentHeading());
        }
	}
}

export const headingReducer: Reducer<Heading> = (state: Heading = new Heading(), action: IActions.IGetHeading | IActions.ISetCurrentHeading | IActions.IClearCurrentHeading) => {
	switch (action.type) {
        case Types.GET_HEADING:
        case Types.SET_CURRENT_HEADING:
            return action.heading;
        case Types.CLEAR_CURRENT_HEADING:
            return new Heading();
        default:
			return state;
	}
}

export const headingIdReducer: Reducer<number> = (state: number = 0, action: IActions.ISetCurrentHeading | IActions.IClearCurrentHeading) => {
    switch (action.type) {
        case Types.SET_CURRENT_HEADING:
            return action.heading.id;
        case Types.CLEAR_CURRENT_HEADING:
            return 0;
        default:
			return state;
    }
}