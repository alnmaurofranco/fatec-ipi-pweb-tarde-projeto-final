export default function (
    state = { loading: true, dataError: false, products: [] },
    action
) {
    switch (action.type) {
        case 'PRODUCTS_LIST':
            return {
                ...state,
                loading: true,
                dataError: false
            }
        case 'PRODUCTS_SUCCESS':
            return {
                loading: false,
                dataError: false,
                products: action.payload,
            }
        case 'PRODUCTS_FAIL':
            return {
                ...state,
                loading: false,
                dataError: true
            }
        default:
            return state;
    }
}