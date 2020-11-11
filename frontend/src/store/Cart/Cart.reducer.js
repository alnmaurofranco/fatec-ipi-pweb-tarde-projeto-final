const initialState = {
    cartItems: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_ADD_ITEM_SUCCESS':
            const item = action.payload;
            const existItem = state.cartItems.find(cart => cart.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(cart =>
                        cart.product === existItem.product ? item : cart
                    ),
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case 'CART_REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case 'CART_ADD_ITEM_FAIL':
            return {
                ...state
            }
        default:
            return state
    }
}