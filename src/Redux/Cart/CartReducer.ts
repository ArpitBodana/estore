import { CartActions, CartActionTypes, CartState } from "./CartTypes";

const data = localStorage.getItem('cartItems');
const initialState = {
    cartItems: data ? JSON.parse(data) : [],
}

const CartReducer = (state: CartState = initialState, action: CartActions) => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            const { payload } = action
            const item = state.cartItems.find(product => product._id === payload._id);
            if (item) {
                if (item.quantity < item.countInStock) {
                    const data = state.cartItems.map(item => item._id === payload._id ? { ...item, quantity: item.quantity + 1 } : item)
                    localStorage.setItem('cartItems', JSON.stringify(data))
                    return {
                        ...state,
                        cartItems: state.cartItems.map(item => item._id === payload._id ? { ...item, quantity: item.quantity + 1 } : item)
                    }
                } else {
                    return {
                        ...state,
                    }
                }

            }

            const data = [...state.cartItems, action.payload]
            localStorage.setItem('cartItems', JSON.stringify(data))
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case CartActionTypes.DCR_QTY:
            const itemDCR = state.cartItems.find(product => product._id === action.payload._id);
            if (itemDCR) {
                const dataDC = state.cartItems.map(item => item._id === action.payload._id ? { ...item, quantity: item.quantity - 1 } : item)
                localStorage.setItem('cartItems', JSON.stringify(dataDC))
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === action.payload._id ? { ...item, quantity: item.quantity - 1 } : item)
                }
            }
            const dataDC = [...state.cartItems, action.payload]
            localStorage.setItem('cartItems', JSON.stringify(dataDC))
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case CartActionTypes.INC_QTY:
            const itemINC = state.cartItems.find(product => product._id === action.payload._id);
            if (itemINC) {
                const data = state.cartItems.map(item => item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item)
                localStorage.setItem('cartItems', JSON.stringify(data))
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item)
                }
            }
            const dataIN = [...state.cartItems, action.payload]
            localStorage.setItem('cartItems', JSON.stringify(dataIN))
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }

        case CartActionTypes.REMOVE_ITEM:
            const data2 = state.cartItems.filter(item => item._id !== action.payload._id && item)
            localStorage.setItem('cartItems', JSON.stringify(data2))
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item._id !== action.payload._id && item)
            }
        case CartActionTypes.CLEAR_CART:
            localStorage.removeItem('cartItems');
            return{
                ...state,
                cartItems:[]
            }
        default:
            return state
    }
}

export default CartReducer