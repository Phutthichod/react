import Action from '../actions' 


const init = ()=>{
    if(localStorage.getItem('cart'))
        return JSON.parse(localStorage.getItem('cart'))
    else return []
}
var initialState = {
    cart: init(),
}




function cartReducer(state = initialState, action) {
    const newCart = state.cart
    switch (action.type) {
        case Action.DELETE:
            let cart = newCart.filter((item)=>item.id_dress!==action.dress.id_dress)
            localStorage.setItem('cart',JSON.stringify(cart))
            return {
                cart
            }
        case Action.ADD:
            console.log(newCart)
            const index = newCart.findIndex((item)=>(item.id_dress === action.dress.id_dress))
            console.log(index)
            if(index!==-1){
                newCart[index].number += action.dress.number;
            }else{
                newCart.push(action.dress)
                console.log(newCart)
            }
            localStorage.setItem('cart',JSON.stringify(newCart))
            return {
                
                cart:newCart
            }
            case Action.DELETEALL:
                return{
                    cart:[]
                }
        default:
            return state
    }
}

export default cartReducer;