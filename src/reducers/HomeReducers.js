import {
    GET_IMAGE_LIST_FAIL,
    GET_IMAGE_LIST_REQUEST,
    GET_IMAGE_LIST_SUCCESS,
} from "../constants/homeConstants";

export const imageListReducers = (
    state = {
        loading: true,
        imageList: []
    }, action) => {
    switch (action.type) {
        case GET_IMAGE_LIST_REQUEST:
            return {
                loading: true
            };
        case GET_IMAGE_LIST_SUCCESS:
            return {
                loading: false, images: action.payload
            };
        case GET_IMAGE_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }; 
        default:
            return state;
    }
}