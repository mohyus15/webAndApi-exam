import { GET_ARTICLE, CREATE_ARTICLE, DELETE_ARTICLE, UPDATE_ARTICLE } from '../store/types';

export const ArticleReducer = (state, action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return { ...state, articles: action.payload };
        case CREATE_ARTICLE:
            return { ...state, articles: [...state.articles, action.payload] };
        case DELETE_ARTICLE:
            return { ...state, articles: state.articles.filter(article => article._id !== action.payload) };
        case UPDATE_ARTICLE:
            return {
                ...state,
                articles: state.articles.map(article =>
                    article._id === action.payload.id ? { ...article, ...action.payload.updatedArticle } : article
                )
            };
        default:
            return state;
    }
};
