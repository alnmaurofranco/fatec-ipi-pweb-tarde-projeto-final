import api from '../../services/api';

export const detailsProduct = (productId) => async dispatch => {
    dispatch({
        type: 'PRODUCT_DETAILS_REQUEST',
        payload: productId
    })

    try {
        const response = await api.get(`/product/${productId}`);
        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL'
        })
    }
}