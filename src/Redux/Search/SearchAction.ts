import { SearchStateType, SearchTypes } from "./SearchTypes"

export const RequestSearch=()=>{
    return{
        type:SearchTypes.SEARCH_REQUEST
    }
}

export const SearchSuccess=(data:SearchStateType)=>{
    return{
        type:SearchTypes.SEARCH_SUCCESS,
        payload:data
    }
}

export const SearchFails=(error:string)=>{
    return{
        type:SearchTypes.SEARCH_FAIL,
        payload:error
    }
}