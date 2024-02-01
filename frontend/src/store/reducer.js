import { create_products, get_products, login, loggout } from "./types"
export const MainReducer = (state, action) => {
    switch(action.type){
        case login:
            return { user: action.payload };
        case loggout:
            return { user: null };
        case get_products:
            return {
                products: action.payload,
            }
        case create_products:
            return {
                products:[action.payload, ...state.products]
            }
        default:
            return state
            
    }
    

}