const initialState = {}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return {
                loading: true,
                ...state
            }
        case 'USER_LOGIN_SUCCESS':
            return {
                loading: false,
                user: action.payload
            }
        case 'USER_LOGIN_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'USER_LOGOUT':
            return {}
        default:
            return state;
    }
}