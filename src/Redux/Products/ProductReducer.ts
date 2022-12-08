import { ProductActionTypes, ProductAction, ProductState, } from "./ProductType"

const initialState = {
    loading: false,
    products: [],
    error: ''
}



const ProductReducer = (state: ProductState = initialState, action: ProductAction) => {
    switch (action.type) {
        case ProductActionTypes.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case ProductActionTypes.PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payloads,
                error: ''
            }
        case ProductActionTypes.PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payloads
            }
        default:
            return state
    }
}

export default ProductReducer