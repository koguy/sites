import { Reducer } from "redux";
import {Types} from './types';
import {Category} from '../models/Category';

// export interface ICategoryState {
//     list: Array<Category>,
//     status: string
// }

export namespace IActions{
    export interface IFetchList {
        type: 'FETCH_CATEGORY_LIST',
        categoryList: Array<Category>
    }
}

export namespace Actions {
    export const fetchList = (categoryList: Array<Category>): IActions.IFetchList => {
        return {
            type: Types.FETCH_CATEGORY_LIST,
            categoryList
        }
    }

	export const actionCreators = {
        fetchCategoryList:() => (dispatch) => {
            fetch("http://localhost:5000/api/category", {
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

export const reducer: Reducer<Array<Category>> = (state: Array<Category> = Array<Category>(), action: KnowAction) => {
	switch (action.type) {
        case Types.FETCH_CATEGORY_LIST:
            return action.categoryList;
		default:
			return state;
	}
}