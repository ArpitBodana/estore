import { ProductType } from "../../Types/Product";

export const FETCH_SINGLE_PRODUCT = 'FETCH_SINGLE_PRODUCT';
export const SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS";
export const SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL";

export type SingleProductState = {
    loading: boolean,
    products: Partial<ProductType>,
    error: string
}

export enum SingleProductActionTypes {
    FETCH_SINGLE_PRODUCT = "FETCH_SINGLE_PRODUCT",
    SINGLE_PRODUCT_SUCCESS = "SINGLE_PRODUCT_SUCCESS",
    SINGLE_PRODUCT_FAIL = "SINGLE_PRODUCT_FAIL"

}

type FETCH_SINGLE_PRODUCT_ACTION = {
    type: SingleProductActionTypes.FETCH_SINGLE_PRODUCT
}

type SINGLE_PRODUCT_SUCCESS_ACTION = {
    type: SingleProductActionTypes.SINGLE_PRODUCT_SUCCESS,
    payload: ProductType
}

type SINGLE_PRODUCT_FAIL_ACTION = {
    type: SingleProductActionTypes.SINGLE_PRODUCT_FAIL,
    payload: string
}

export type SINGLE_PRODUCT_ACTIONS = FETCH_SINGLE_PRODUCT_ACTION | SINGLE_PRODUCT_SUCCESS_ACTION | SINGLE_PRODUCT_FAIL_ACTION;