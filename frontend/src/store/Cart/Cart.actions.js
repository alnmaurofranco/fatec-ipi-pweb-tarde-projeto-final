import api from "../../services/api"

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const result = await api.get(`/product/find/${productId}`);
        const { data } = result.data;
        console.log('req api ==>', data);
        dispatch({
            type: 'CART_ADD_ITEM_SUCCESS',
            payload: {
                codigo: data.cod_product,
                title: data.title,
                image_url: data.image_url,
                price: data.price,
                unit: data.unit,
                product: data.id,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({
            type: 'CART_ADD_ITEM_FAIL'
        })
    }
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: productId
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}