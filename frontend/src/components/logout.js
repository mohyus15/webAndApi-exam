import { useContext} from "react";
import { authContext } from '../store/userContext';
import { loggout } from "../store/types";
import { useNavigate } from "react-router-dom";



export const useLogout =() => {
    const navigate = useNavigate()
    const {dispatch } = useContext(authContext);
    const logout =()=> {
        localStorage.removeItem('user');
        dispatch({ type: loggout});
        navigate("/login")
    }
return {logout}
}