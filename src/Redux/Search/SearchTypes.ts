import { ProductType } from "../../Types/Product"

export enum SearchTypes {
    SEARCH_SUCCESS = "SEARCH_SUCCESS",
    SEARCH_FAIL = "SEARCH_FAIL",
    SEARCH_REQUEST = "SEARCH_REQUEST"
}
export type SearchStateType = {
    loading: Boolean,
    error: String,
    products: ProductType[],
    pages: Number,
    countProducts: Number,
    mypage: Number,
}
type reqSearch = {
    type: SearchTypes.SEARCH_REQUEST
}

type searchSucces = {
    type: SearchTypes.SEARCH_SUCCESS
    payload: SearchStateType
}

type searchFail = {
    type: SearchTypes.SEARCH_FAIL
    payload: string
}

export type SearchActionTypes = reqSearch | searchFail | searchSucces;