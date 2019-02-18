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
    export interface ISetCurrentCategory {
        type: 'SET_CURRENT_CATEGORY',
        category: Category
    }
    export interface IClearCurrentCategory {
        type: 'CLEAR_CURRENT_CATEGORY'
    }
}

export namespace Actions {
    export const fetchList = (categoryList: Array<Category>): IActions.IFetchList => {
        return {
            type: Types.FETCH_CATEGORY_LIST,
            categoryList
        }
    }
    export const setCurrentCategory = (category: Category): IActions.ISetCurrentCategory => {
        return {
            type: Types.SET_CURRENT_CATEGORY,
            category
        }
    }
    export const clearCurrentCategory = (): IActions.IClearCurrentCategory => {
        return {
            type: Types.CLEAR_CURRENT_CATEGORY
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
        },
        setCurrentCategory:(category: Category) => (dispatch) => {
            dispatch(setCurrentCategory(category));
        },
        clearCurrentCategory:() => (dispatch) => {
            dispatch(clearCurrentCategory());
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

export const categoryReducer: Reducer<Category> = (state: Category = new Category(), action: IActions.ISetCurrentCategory | IActions.IClearCurrentCategory) => {
    switch (action.type) {
        case Types.SET_CURRENT_CATEGORY:
            return action.category;
        case Types.CLEAR_CURRENT_CATEGORY:
            return new Category();
        default:
			return state;
    }
}

export const categoryIdReducer: Reducer<number> = (state: number = 0, action: IActions.ISetCurrentCategory | IActions.IClearCurrentCategory) => {
    switch (action.type) {
        case Types.SET_CURRENT_CATEGORY:
            return action.category.id;
        case Types.CLEAR_CURRENT_CATEGORY:
            return 0;
        default:
			return state;
    }
}