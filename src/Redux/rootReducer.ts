import { combineReducers } from "redux";
import AdminReducer from "./Admin/AdminReducer";
import CartReducer from "./Cart/CartReducer";
import OrderReducer from "./Order/OrderReducer";
import ProductReducer from "./Products/ProductReducer";
import SearchReducer from "./Search/SearchReducer";
import SingleProductReducer from "./SingleProduct/SingleProductReducer";
import UserReducer from "./User/UserReducer";

const rootReducer = combineReducers({
    product: ProductReducer,
    singleProduct: SingleProductReducer,
    cart: CartReducer,
    user: UserReducer,
    order: OrderReducer,
    search: SearchReducer,
    admin: AdminReducer,
})

export default rootReducer