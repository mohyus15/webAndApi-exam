import { update_user, login, loggout, delete_user } from "./types";
export const MainReducer = (state, action) => {
        switch (action.type) {
            case login:
                return { ...state, user: action.payload, users: [] };
            case loggout:
                return { ...state, user: null, users: [] };
            case update_user:
                return {
                    ...state,
                    user: { ...state.user, ...action.payload }
                };
            case delete_user:
                if (!Array.isArray(state.user)) {
                    return state;
                }
                return {
                    ...state,
                    user: state.user.filter(user => user._id !== action.payload)
                };
            default:
                return state;
        }
    
};

