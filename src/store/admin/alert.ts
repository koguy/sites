// import {Types} from './cnst';
// import {Reducer} from 'redux';

// export namespace IActions {
//     export interface IAlertSuccess {
//         type: 'ALERT_SUCCESS',
//         message: string
//     }

//     export interface IAlertError {
//         type: 'ALERT_ERROR',
//         message: string
//     }

//     export interface IAlertClear {
//         type: 'ALERT_CLEAR'
//     }
// }

// export namespace Actions {
//     export const alertSuccess = (message: string): IActions.IAlertSuccess => {
//         return {
//             type: Types.alert.SUCCESS,
//             message
//         }
//     }
//     export const alertError = (message: string): IActions.IAlertError => {
//         return {
//             type: Types.alert.ERROR,
//             message
//         }
//     }
//     export const alertClear = (): IActions.IAlertClear => {
//         return {
//             type: Types.alert.CLEAR
//         }
//     }
// }

// export interface IAlertState {

// }

// type KnownActions = IActions.IAlertClear | IActions.IAlertError | IActions.IAlertSuccess;

// export const alertReducer: Reducer = (state: string, action: KnownActions) => {
//     switch(action.type) {
//         case Types.alert.ERROR:
//             return Types.alert.ERROR;
//         default:
//             return state;
//     }
// }