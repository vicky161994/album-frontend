import Axios from "axios";
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/userConstants";
export const register = (name, email, password) => async (dispatch, getState) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    });
    try {
        const {
            data
        } = await Axios.post("/api/user/register", {
            name,
            email,
            password
        });
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message,
        });
    }
};