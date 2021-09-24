import Axios from "axios";
import {
    GET_IMAGE_LIST_FAIL,
    GET_IMAGE_LIST_REQUEST,
    GET_IMAGE_LIST_SUCCESS,
} from "../constants/homeConstants";
export const getImageList = (pageNumber, limit) => async (dispatch, getState) => {
    dispatch({
        type: GET_IMAGE_LIST_REQUEST
    });
    try {
        const {
            userLogin: { user },
          } = getState();
          console.log(user);
        const {
            data
        } = await Axios.post("/api/home/get-all-image", {
            pageNumber,
            limit
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        });
        dispatch({
            type: GET_IMAGE_LIST_SUCCESS,
            payload: data.imageList,
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_IMAGE_LIST_FAIL,
            payload: error.response.data.message,
        });
    }
};