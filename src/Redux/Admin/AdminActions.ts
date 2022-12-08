import axios from "axios"
import { MapDispatch } from "../Products/ProductType"
import { AdminStateTypes, AdminTypes } from "./AdminTypes"

export const fetchAdminRequest = () => {
    return {
        type: AdminTypes.FETCH_ADMIN_DATA
    }
}

export const fetchAdminSuccess = (data: AdminStateTypes) => {
    return {
        type: AdminTypes.FETCH_ADMIN_SUCCESS,
        payload: data
    }
}

export const fetchAdminFail = (error: string) => {
    return {
        type: AdminTypes.FETCH_ADMIN_FAIL,
        payload: error
    }
}
export const clearAdminData = () => {
    return {
        type: AdminTypes.CLEAR_ADMIN_DATA
    }
}

export const getAdminData = (access_token: string) => {

    return (dispatch: MapDispatch) => {

        //@ts-ignore
        dispatch(fetchAdminRequest())
        axios.get(`https://estore-backend.vercel.app/api/admin`, {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        }).then(res => {
            //@ts-ignore
            dispatch(fetchAdminSuccess(res.data))
        }).catch(error => {
            const errorMsg: string = error.message
            //@ts-ignore
            dispatch(fetchAdminFail(errorMsg))
        })

    }
}