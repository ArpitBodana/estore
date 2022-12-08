import { createStore } from "redux";
import { applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";



const store = createStore(rootReducer, applyMiddleware(thunk))

export default store