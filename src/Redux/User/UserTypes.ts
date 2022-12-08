export enum userTypes {
    REQUEST_SIGNIN = "REQUEST_SIGNIN",
    SIGNIN_FAIL = "SIGNIN_FAIL",
    SIGNIN_SUCCESS = "SIGNIN_SUCCESS",
    SIGNOUT = "SIGNOUT",
    USER_SHIPPING_ADDRESS = "USER_SHIPPING_ADDRESS",
    USER_PAYMENT_METHOD = "USER_PAYMENT_METHOD",
    UPDATE_REQUEST = "UPDATE_REQUEST",
    UPDATE_SUCCESS = "UPDATE_SUCCESS",
    UPDATE_FAIL = "UPDATE_FAIL",

}

export type UserDataTypes = {
    _id: string,
    access_token: string,
    email: string,
    name: string,
    role: string,
}

export type UserStateTypes = {
    user: Partial<UserDataTypes>,
    loading: boolean,
    error: string,
    shipping: Partial<UserAddressType>,
    paymentMethod: string
}

export type UserAddressType = {
    fullName: string,
    address: string,
    city: string,
    postalCode: string,
    country: string
}


type SignInSuccess = {
    type: userTypes.SIGNIN_SUCCESS,
    payload: UserStateTypes
}

type SignInFail = {
    type: userTypes.SIGNIN_FAIL,
    payload: string
}

type RequestSignIn = {
    type: userTypes.REQUEST_SIGNIN
}
type SignOut = {
    type: userTypes.SIGNOUT
}

type UserShipingAddress = {
    type: userTypes.USER_SHIPPING_ADDRESS,
    payload: UserAddressType
}
type UserPaymentMethod = {
    type: userTypes.USER_PAYMENT_METHOD,
    payload: string

}
type updateReq = {
    type: userTypes.UPDATE_REQUEST,
}
type updateSuc = {
    type: userTypes.UPDATE_SUCCESS,
}
type updateFail = {
    type: userTypes.UPDATE_FAIL,
}

export type UserActions = SignInSuccess | RequestSignIn | SignInFail | SignOut | UserShipingAddress | UserPaymentMethod | updateFail | updateReq | updateSuc;
