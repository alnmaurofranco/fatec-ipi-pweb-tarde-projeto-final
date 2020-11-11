import api from '../../services/api';

export const GetProducts = () => async dispatch => {
    try {
        dispatch({
            type: 'PRODUCTS_LIST'
        })

        const result = await api.get("/product/all");

        dispatch({
            type: 'PRODUCTS_SUCCESS',
            payload: result.data.data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCTS_FAIL'
        })
    }
}