import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './Products/Products.reducer';
import productReducer from './Product/Product.reducer';
import { cartReducer } from './Cart/Cart.reducer';
import { userReducer } from './User/User.reducer';
import api from '../services/api';

const initialState = {
    userLogin: {
        user: localStorage.getItem('token')
            ? api.defaults.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            : null
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
}

const rootReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
    userLogin: userReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store