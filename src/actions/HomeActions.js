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
            data
        } = await Axios.post("/api/home/get-all-image", {
            pageNumber,
            limit
        }, {
            headers: {
                Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRjNDMwMDYzMjkwZTc0YTM5NjM4ZWMiLCJuYW1lIjoiVmlja3kgS3VtYXIiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2MzI0MDQ3NzEsImV4cCI6MTYzMzAwOTU3MX0.NPa3WcBqM23jsYDvGWmZhRP2EtFCvpSdwe9qHPcrCec'}`
            },
        });
        dispatch({
            type: GET_IMAGE_LIST_SUCCESS,
            payload: data.imageList,
        });
    } catch (error) {
        dispatch({
            type: GET_IMAGE_LIST_FAIL,
            payload: error.response.data.message,
        });
    }
};