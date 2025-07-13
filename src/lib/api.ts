import { getArticleResponse, toGetArticleResponse } from "./types";
import { ApiError, type ApiErrorType } from "./types";

const API_BASE_URL = '/api';

async function fetchAPI(path: string): Promise<Response | ApiErrorType> {
    const url = `${API_BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        if (res.status === 404) {
            return ApiError.FAILED_REQUEST_404;
        }
        
        return ApiError.FAILED_REQUEST;
    }

    return res.json();
}


export async function getArticles(): Promise<getArticleResponse[] | ApiErrorType> {
    const rawResponse = await fetchAPI('/articles');

    if (Object.values(ApiError).includes(rawResponse as ApiErrorType)) {
        return rawResponse as ApiErrorType;
    }

    const res = await toGetArticleResponse(rawResponse as Response); 

    return res.json();
}

export async function getArticlesByUser(user: string): Promise<getArticlesResponse[]> {
    const url = '/articles/search?' + new URLSearchParams({ author: user })
    return fetchAPI(url);
}

export async function getArticle(id: string): Promise<getArticlesResponse> {
    return fetchAPI(`/articles/${id}`);
}
