import { useEffect, useReducer } from 'react'
import { authContext } from './userContext'
import { MainReducer } from './reducer'
import { login } from './types'

export const  MainContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(MainReducer, {
        products: null,
        user: null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: login, payload: user})
        }
    },[])
    console.log("auth state ", state)
    return (
    <authContext.Provider value={{...state, dispatch}}>
        {children}
    </authContext.Provider>
    
 
    )
}