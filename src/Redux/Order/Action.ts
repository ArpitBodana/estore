import { orderObject, orderTypes } from "./Types"

export const createRequest = () => {
    return {
        type: orderTypes.CREATE_REQUEST,
    }
}

export const createSuccess = (order: orderObject) => {
    return {
        type: orderTypes.CREATE_SUCCESS,
        payload: order
    }
}

export const createFail = (error: String) => {
    return {
        type: orderTypes.CREATE_FAIL,
        payload: error
    }
}

export const reqPay = () => {
    return {
        type: orderTypes.PAY_REQUEST
    }
}

export const paySuccess = (data: any) => {
    return {
        type: orderTypes.PAY_SUCCESS,
        payload: data
    }
}

export const payFail = (err: String) => {
    return {
        type: orderTypes.PAY_FAIL,
        payload: err
    }
}

export const payReset = () => {
    return {
        type: orderTypes.PAY_RESET
    }
}

export const fetchAllOrders = () => {
    return {
        type: orderTypes.FETCH_ORDERS
    }
}

export const fetchAllOrdersSuccess = (data: Partial<orderObject>[]) => {
    return {
        type: orderTypes.FETCH_SUCCESS,
        payload: data
    }
}

export const fetchAllOrdersFail = (err: String) => {
    return {
        type: orderTypes.FETCH_FAIL,
        payload: err
    }
}