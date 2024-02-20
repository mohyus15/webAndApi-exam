import React, { createContext, useEffect, useReducer } from 'react';
import { ArticleReducer } from '../store/ArticleReducer';
import { GET_ARTICLE } from './types';

export const articleContext = createContext();
export const ArticleContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ArticleReducer, {
        articles: [],
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('your_api_endpoint');
                const data = await response.json();
                dispatch({ type: GET_ARTICLE, payload: data });
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <articleContext.Provider value={{...state, dispatch}}>
            {children}
        </articleContext.Provider>
    );
};