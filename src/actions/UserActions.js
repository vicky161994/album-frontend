import Axios from "axios";
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL
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

export const login = (email, password) => async (dispatch, getState) => {
    dispatch({
        type: USER_LOGIN_REQUEST
    });
    try {
        const {
            data
        } = await Axios.post("/api/user/login", {
            email,
            password
        });
        localStorage.setItem('album-userDetails', JSON.stringify(data));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};