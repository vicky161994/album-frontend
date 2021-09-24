import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import thunk from "redux-thunk";
import { imageListReducers } from "./reducers/HomeReducers";
import { userRegisterReducer } from "./reducers/UserReducers";
const initialState = {};
const reducer = combineReducers({
    imageList: imageListReducers,
    userRegister: userRegisterReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;