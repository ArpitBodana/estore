import { UserActions, UserStateTypes, userTypes } from "./UserTypes"


const data = localStorage.getItem('userInfo');
const shippinData = localStorage.getItem('shippingInfo');
const paymentMethodData = localStorage.getItem('paymentType');
const userIntialState = {
    user: data ? JSON.parse(data) : {},
    loading: false,
    error: '',
    shipping: shippinData ? JSON.parse(shippinData) : {},
    paymentMethod: paymentMethodData ? JSON.parse(paymentMethodData) : ""
}


const UserReducer = (state: UserStateTypes = userIntialState, action: UserActions) => {
    switch (action.type) {
        case userTypes.REQUEST_SIGNIN:
            return {
                ...state,
                loading: true,
            }
        case userTypes.SIGNIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: {}
            }
        case userTypes.SIGNIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: "",

            }
        case userTypes.SIGNOUT:
            localStorage.removeItem('userInfo');
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            localStorage.removeItem('paymentType');
            return {
                ...state,
                user: null,
            }
        case userTypes.USER_SHIPPING_ADDRESS:
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            return {
                ...state,
                shipping: action.payload

            }
        case userTypes.USER_PAYMENT_METHOD:
            localStorage.setItem('paymentType', JSON.stringify(action.payload))
            return {
                ...state,
                paymentMethod: action.payload
            }
        case userTypes.UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userTypes.UPDATE_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case userTypes.UPDATE_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default UserReducer;

