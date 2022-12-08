import { CartProductType} from "../../Types/Product";

export const ADD_TO_CART = "ADD_TO_CART";
export const INC_QTY = "INC_QTY";
export const DCR_QTY = "DCR_QTY";
export const REMOVE_ITEM="REMOVE_ITEM";
export const CLEAR_CART="CLEAR_CART";


export enum CartActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    INC_QTY = "INC_QTY",
    DCR_QTY = "DCR_QTY",
    REMOVE_ITEM="REMOVE_ITEM",
    CLEAR_CART="CLEAR_CART"
}
export type CartState = {
    cartItems: CartProductType[]
}
export type CartActions = {
    type: CartActionTypes.ADD_TO_CART|CartActionTypes.INC_QTY|CartActionTypes.DCR_QTY| CartActionTypes.REMOVE_ITEM| CartActionTypes.CLEAR_CART,
    payload: CartProductType
}



