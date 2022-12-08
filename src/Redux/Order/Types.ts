import { CartProductType } from "../../Types/Product"
import { UserAddressType } from "../User/UserTypes"

export enum orderTypes {
    CREATE_REQUEST = "CREATE_REQUEST",
    CREATE_SUCCESS = "CREATE_SUCCESS",
    CREATE_FAIL = "CREATE_FAIL",
    PAY_REQUEST = "PAY_REQUEST",
    PAY_SUCCESS = "PAY_SUCCESS",
    PAY_FAIL = "PAY_FAIL",
    PAY_RESET = "PAY_RESET",
    FETCH_ORDERS = "FETCH_ORDERS",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAIL = "FETCH_FAIL",
}

export type orderObject = {
    _id: String,
    orderItems: CartProductType[],
    shippingAddress: UserAddressType,
    paymentMethod: String,
    itemsPrice: Number,
    shippingPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    user: String,
    isPaid: Boolean,
    isDelivered: Boolean,
    paidAt?: String,
    deliverdAt?: String,
    createdAt?:String,
}
export type orderStateType = {
    loading: Boolean,
    error: String,
    order: Partial<orderObject>,
    loadingPay: Boolean,
    successPay: Boolean,
    allOrders: Partial<orderObject>[]
}

type create = {
    type: orderTypes.CREATE_REQUEST
}

type success = {
    type: orderTypes.CREATE_SUCCESS
    payload: orderObject
}

type fail = {
    type: orderTypes.CREATE_FAIL,
    payload: string
}

type payReq = {
    type: orderTypes.PAY_REQUEST
}

type paySucc = {
    type: orderTypes.PAY_SUCCESS
    payload: any
}

type payFail = {
    type: orderTypes.PAY_FAIL
    payload: string
}
type payReset = {
    type: orderTypes.PAY_RESET
}

type fetchOrders = {
    type: orderTypes.FETCH_ORDERS
}

type fetchSucc = {
    type: orderTypes.FETCH_SUCCESS
    payload: Partial<orderObject>[]
}

type fetchFail = {
    type: orderTypes.FETCH_FAIL
    payload: string
}

export type OrderAction = create | success | fail | payFail | payReq | paySucc | payReset | fetchFail | fetchSucc | fetchOrders;