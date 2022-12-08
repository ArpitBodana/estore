import { SearchActionTypes, SearchStateType, SearchTypes } from "./SearchTypes"

const searchInitialState = {
    loading: false,
    error: '',
    products: [],
    pages: 0,
    countProducts: 0,
    mypage: 0,
}

const SearchReducer = (state: SearchStateType = searchInitialState, action: SearchActionTypes) => {
    switch (action.type) {
        case SearchTypes.SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SearchTypes.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                page: action.payload.mypage,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts
            }
        case SearchTypes.SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }

}

export default SearchReducer;