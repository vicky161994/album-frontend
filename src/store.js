import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore
} from "redux";
import thunk from "redux-thunk";
import {
    imageListReducers
} from "./reducers/HomeReducers";
import {
    userLoginReducers,
    userRegisterReducer
} from "./reducers/UserReducers";
const initialState = {
    userLogin: {
        user: localStorage.getItem("album-userDetails") ?
            JSON.parse(localStorage.getItem("album-userDetails")) :
            null,
    },
};
const reducer = combineReducers({
    imageList: imageListReducers,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducers,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;