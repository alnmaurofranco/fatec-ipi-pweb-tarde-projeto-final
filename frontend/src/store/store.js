import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import calculatorReducer from './Calculator/Calculator.reducer';
import productsReducer from './Products/Products.reducer';
import productReducer from './Product/Product.reducer';
import { cartReducer } from './Cart/Cart.reducer';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
}

const rootReducer = combineReducers({
    calculator: calculatorReducer,
    products: productsReducer,
    product: productReducer,
    cart: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store