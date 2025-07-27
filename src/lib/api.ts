import { ApiError, ApiErrorType, ArticleResponse, toArticleResponse, toArticlesResponse } from "./types";

const API_BASE_URL = '/api';

async function fetchAPI(path: string): Promise<any | ApiError> {
    const url = `${API_BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        if (res.status === 404) {
            return new ApiError(ApiErrorType.NOT_FOUND);
        }
        
        return new ApiError(ApiErrorType.FAILED_REQUEST);
    }

    return res;
}


export async function getArticles(): Promise<ArticleResponse[] | ApiError> {
    const rawResponse = await fetchAPI('/articles');

    if (rawResponse instanceof ApiError) {
        return rawResponse as ApiError;
    }

    return await toArticlesResponse(rawResponse);
}

export async function getArticlesByUser(user: string): Promise<ArticleResponse[] | ApiError> {
    const url = '/articles/search?' + new URLSearchParams({ author: user })
    
    const rawResponse = await fetchAPI(url);
    
    if (rawResponse instanceof ApiError) {
        return rawResponse as ApiError;
    }

    return await toArticlesResponse(rawResponse);
}

export async function getArticle(id: string): Promise<ArticleResponse | ApiError> {
    const rawResponse = await fetchAPI(`/articles/${id}`);

    if (rawResponse instanceof ApiError) {
        return rawResponse as ApiError;
    }

    return await toArticleResponse(rawResponse);
}

export async function searchArticles(query: string): Promise<any> {
    const url = '/articles/search?' + new URLSearchParams({ title_q: query })
    
    const rawResponse = await fetchAPI(url);

    if (rawResponse instanceof ApiError) {
        return rawResponse as ApiError;
    }

    return await toArticlesResponse(rawResponse);
}