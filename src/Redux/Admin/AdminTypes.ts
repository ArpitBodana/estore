import { UserDataTypes } from "../User/UserTypes";
import { ProductType } from "../../Types/Product";
import { orderObject } from "../Order/Types";

export enum AdminTypes {
    FETCH_ADMIN_DATA = "FETCH_ADMIN_DATA",
    FETCH_ADMIN_FAIL = "FETCH_ADMIN_FAIL",
    FETCH_ADMIN_SUCCESS = "FETCH_ADMIN_SUCCESS",
    CLEAR_ADMIN_DATA = "CLEAR_ADMIN_DATA"
}

export type AdminStateTypes = {
    loading: boolean,
    error: string,
    users: UserDataTypes[],
    products: ProductType[],
    orders: orderObject[]
}

type AdminRequest = {
    type: AdminTypes.FETCH_ADMIN_DATA
}

type AdminSuccess = {
    type: AdminTypes.FETCH_ADMIN_SUCCESS
    payload: AdminStateTypes
}
type AdminFail = {
    type: AdminTypes.FETCH_ADMIN_FAIL
    payload: string
}
type AdminClear = {
    type: AdminTypes.CLEAR_ADMIN_DATA
}

export type AdminActionsType = AdminRequest | AdminSuccess | AdminFail | AdminClear;