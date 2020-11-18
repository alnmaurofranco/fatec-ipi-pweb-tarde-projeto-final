import api from '../../services/api';

export const LoginUser = (email, password) => async dispatch => {
    dispatch({
        type: 'USER_LOGIN_REQUEST',
        payload: {
            email,
            password
        }
    })
    try {
        const { data: { token } } = await api.post('/auth/login', { email, password });
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: token
        })
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        window.location.pathname = '/dashboard';
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const UserLogout = () => async dispatch => {
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    dispatch({
        type: 'USER_LOGOUT'
    })
}