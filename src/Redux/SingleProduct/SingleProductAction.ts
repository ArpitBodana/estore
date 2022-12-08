import axios from "axios";
import { ProductType } from "../../Types/Product";
import { MapDispatch } from "../Products/ProductType";
import { FETCH_SINGLE_PRODUCT, SINGLE_PRODUCT_FAIL, SINGLE_PRODUCT_SUCCESS } from "./SingleProductTypes";

export const fetchSingleProduct = () => {
    return {
        type: FETCH_SINGLE_PRODUCT
    }
}

export const fetchSingleProductSuccess = (product: ProductType) => {
    return {
        type: SINGLE_PRODUCT_SUCCESS,
        payload: product
    }
}

export const fetchSingleProductFail = (error: string) => {
    return {
        type: SINGLE_PRODUCT_FAIL,
        payload: error
    }
}

export const fetchSingleRequest = (id: string) => {
    return (dispatch: MapDispatch) => {
        //@ts-ignore
        dispatch(fetchSingleProduct())
        axios.get(`https://estore-backend.vercel.app/api/product/${id}`).then(res => {
            const singleProduct: ProductType = res.data
            //@ts-ignore
            dispatch(fetchSingleProductSuccess(singleProduct))
        }).catch(error => {
            const errorMsg: string = error.message
            //@ts-ignore
            dispatch(fetchSingleProductFail(errorMsg))
        })

    }
}