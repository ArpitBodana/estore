import { SingleProductActionTypes, SingleProductState, SINGLE_PRODUCT_ACTIONS } from "./SingleProductTypes"

const initialStateSingleProduct = {
    loading: false,
    products: {},
    error: ''
}

const SingleProductReducer = (state: SingleProductState = initialStateSingleProduct, action: SINGLE_PRODUCT_ACTIONS) => {
    switch (action.type) {
        case SingleProductActionTypes.FETCH_SINGLE_PRODUCT:
            return {
                ...state,
                loading: true,
            }
        case SingleProductActionTypes.SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: ''
            }
        case SingleProductActionTypes.SINGLE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                products: {},
                error: action.payload
            }
        default:
            return state

    }
}

export default SingleProductReducer;