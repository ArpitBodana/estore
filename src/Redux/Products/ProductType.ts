import { ProductType } from "../../Types/Product";
import store from "../store";

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS";
export const PRODUCTS_FAIL = "PRODUCTS_FAIL";

export type MapState = ReturnType<typeof store.getState>
export type MapDispatch = typeof store.dispatch



export type ProductState = {
    loading: boolean,
    products: ProductType[],
    error: string
}

export enum ProductActionTypes {
    FETCH_PRODUCTS = "FETCH_PRODUCTS",
    PRODUCTS_SUCCESS = "PRODUCTS_SUCCESS",
    PRODUCTS_FAIL = "PRODUCTS_FAIL"

}

type FETCH_PRODUCTS_ACTION = {
    type: ProductActionTypes.FETCH_PRODUCTS,
}
type PRODUCTS_SUCCESS_ACTION = {
    type: ProductActionTypes.PRODUCTS_SUCCESS,
    payloads: ProductType
}
type PRODUCTS_FAIL_ACTION = {
    type: ProductActionTypes.PRODUCTS_FAIL,
    payloads: string
}

export type ProductAction = PRODUCTS_FAIL_ACTION | PRODUCTS_SUCCESS_ACTION | FETCH_PRODUCTS_ACTION;

// export type ProductAction = {
//     type: string,
//     payloads?: ProductType[] | string
// };


