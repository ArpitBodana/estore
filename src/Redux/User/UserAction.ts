import { UserAddressType, UserStateTypes, userTypes } from "./UserTypes"


export const userSignIn = (userdata: UserStateTypes) => {
    return {
        type: userTypes.SIGNIN_SUCCESS,
        payload: userdata
    }
}

export const signInFail = (error: string) => {
    return {
        type: userTypes.SIGNIN_FAIL,
        payload: error
    }
}

export const requestSignIn = () => {
    return {
        type: userTypes.REQUEST_SIGNIN
    }
}

export const userSignOut = () => {
    return {
        type: userTypes.SIGNOUT
    }
}

export const userShippingAddress = (UserAddress:UserAddressType) => {
    return {
        type: userTypes.USER_SHIPPING_ADDRESS,
        payload:UserAddress
    }
}
export const userPaymentMethod = (paymentMethod:string) => {
    return {
        type: userTypes.USER_PAYMENT_METHOD,
        payload:paymentMethod
    }
}

