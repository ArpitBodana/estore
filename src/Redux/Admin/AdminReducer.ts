import { AdminActionsType, AdminStateTypes, AdminTypes } from "./AdminTypes"

const AdminInitialState = {
    loading: false,
    error: '',
    users: [],
    products: [],
    orders: []
}

const AdminReducer = (state: AdminStateTypes = AdminInitialState, action: AdminActionsType) => {
    switch (action.type) {
        case AdminTypes.FETCH_ADMIN_DATA:
            return {
                ...state,
                loading: true
            }
        case AdminTypes.FETCH_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                products: action.payload.products,
                orders: action.payload.orders
            }
        case AdminTypes.FETCH_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case AdminTypes.CLEAR_ADMIN_DATA:
            return {
                ...state,
                loading: false,
                error: '',
                users: [],
                products: [],
                orders: []
            }
        default:
            return state

    }
}

export default AdminReducer