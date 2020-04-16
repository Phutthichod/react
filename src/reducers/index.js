import { combineReducers } from 'redux'
import cartReducer from './cart'
import dressReducer from './dressShow'
import flowerReducer from './flower'

export default combineReducers({
    cart: cartReducer,
    dressState:dressReducer,
    flower: flowerReducer
})