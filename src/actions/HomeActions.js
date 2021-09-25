import Axios from "axios";
import {
    GET_IMAGE_LIST_FAIL,
    GET_IMAGE_LIST_REQUEST,
    GET_IMAGE_LIST_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPLOAD_IMAGE_REQUEST,
} from "../constants/homeConstants";

export const getImageList = (pageNumber, limit) => async (dispatch, getState) => {
    const {
        imageList: {
            images
        }
    } = getState();
    if (pageNumber === 1) {
        dispatch({
            type: GET_IMAGE_LIST_REQUEST
        });
    }

    try {
        const {
            userLogin: {
                user
            },
        } = getState();
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
        if (images) {
            dispatch({
                type: GET_IMAGE_LIST_SUCCESS,
                payload: [...images, ...data.imageList],
            });
        } else {
            dispatch({
                type: GET_IMAGE_LIST_SUCCESS,
                payload: data.imageList,
            });
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_IMAGE_LIST_FAIL,
            payload: "Somthing went wrong, Please try again",
        });
    }
};

export const selectedImageUpload = (formData) => async (dispatch, getState) => {
    dispatch({
        type: UPLOAD_IMAGE_REQUEST
    });
    try {
        const {
            userLogin: {
                user
            },
        } = getState();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                Authorization: `Bearer ${user.token}`
            }
        }
        await Axios.post("/api/home/upload-image", formData, config);
        let {
            data
        } = await Axios.post("/api/home/get-all-image", {
            pageNumber: 1,
            limit: 10
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
            type: UPLOAD_IMAGE_FAIL,
            payload: "Somthing went wrong, Please try again",
        });
    }
};

export const capturedImageUpload = (base64image) => async (dispatch, getState) => {
    dispatch({
        type: UPLOAD_IMAGE_REQUEST
    });
    try {
        const {
            userLogin: {
                user
            },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        await Axios.post("/api/home/upload-base64-image", {
            base64image
        }, config);
        let {
            data
        } = await Axios.post("/api/home/get-all-image", {
            pageNumber: 1,
            limit: 10
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
            type: UPLOAD_IMAGE_FAIL,
            payload: "Somthing went wrong, Please try again",
        });
    }
};