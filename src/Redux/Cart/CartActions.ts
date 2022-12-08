import { CartProductType, ProductType } from "../../Types/Product"
import { ADD_TO_CART, CLEAR_CART, DCR_QTY, INC_QTY, REMOVE_ITEM } from "./CartTypes"

export const AddToCart = (product: Partial<ProductType>) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const QtyInc = (item: CartProductType) => {
    return {
        type: INC_QTY,
        payload: item
    }
}

export const QtyDsc = (item: CartProductType) => {
    return {
        type: DCR_QTY,
        payload: item
    }
}

export const RemoveItem = (item: CartProductType) => {
    return {
        type: REMOVE_ITEM,
        payload: item
    }
}

export const ClearCart=()=>{
    return{
        type:CLEAR_CART
    }
}