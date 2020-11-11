export default function (state = { product: {}, loading: true }, action) {
    switch (action.type) {
        case 'PRODUCT_DETAILS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'PRODUCT_DETAILS_SUCCESS':
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case 'PRODUCT_DETAILS_FAIL':
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}