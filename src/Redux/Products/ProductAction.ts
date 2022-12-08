import { ProductType } from "../../Types/Product"
import { FETCH_PRODUCTS, MapDispatch, PRODUCTS_FAIL, PRODUCTS_SUCCESS } from "./ProductType"
import axios from "axios";

export const fetchRequest = () => {
    return {
        type: FETCH_PRODUCTS
    }
}

export const requestSuccess = (products: ProductType[]) => {
    return {
        type: PRODUCTS_SUCCESS,
        payloads: products
    }
}

export const requestFail = (error: string) => {
    return {
        type: PRODUCTS_FAIL,
        payloads: error
    }

}

export const fetchProducts = () => {
    return (dispatch: MapDispatch) => {
        //@ts-ignore
        dispatch(fetchRequest());
        axios.get('https://estore-backend.vercel.app/api/products/').then(res => {
            const users: ProductType[] = res.data
            //@ts-ignore
            dispatch(requestSuccess(users))
        }).catch(error => {
            const errorMsg: string = error.message
            //@ts-ignore
            dispatch(requestFail(errorMsg))
        })

    }
}