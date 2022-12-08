import { OrderAction, orderStateType, orderTypes } from "./Types"


const orderInitialState={
    loading:false,
    error:'',
    order:{},
    loadingPay:false,
    successPay:false,
    allOrders:[],
}

const OrderReducer=(state:orderStateType=orderInitialState,action:OrderAction)=>{
    switch(action.type){
        case orderTypes.CREATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case orderTypes.CREATE_SUCCESS:
            return{
                ...state,
                loading:false,
                order:action.payload
            }
        case orderTypes.CREATE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case orderTypes.PAY_REQUEST:{
            return{
                ...state,
                loadingPay:true
            }
        }
        case orderTypes.PAY_SUCCESS:{
            return{
                ...state,
                loadingPay:false,
                successPay:true,
            }
        }
        case orderTypes.PAY_FAIL:{
            return{
                ...state,
                loadingPay:false,
            }
        }
        case orderTypes.PAY_RESET:{
            return{
                ...state,
                loadingPay:false,
                successPay:false,
            }
        }
        case orderTypes.FETCH_ORDERS :{
            return {
                ...state,
                loading:true,
            }
        }
        case orderTypes.FETCH_SUCCESS:{
            return{
                ...state,
                loading:false,
                allOrders:action.payload
            }
        }
        case orderTypes.FETCH_FAIL:{
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        }
        default:
            return state
    }

}

export default OrderReducer;