import { ApiError, ApiErrorType, type ArticleResponse, toArticleResponse, toArticlesResponse } from "./types";

const API_BASE_URL = '/api';

async function fetchAPI(path: string): Promise<Response | ApiError> {
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

export async function searchArticles(query: string): Promise<ArticleResponse[]| ApiError> {
    const url = '/articles/search?' + new URLSearchParams({ title_q: query })
    
    const rawResponse = await fetchAPI(url);

    if (rawResponse instanceof ApiError) {
        return rawResponse as ApiError;
    }

    return await toArticlesResponse(rawResponse);
}

export async function postArticle(author: string, title: string, content: string): Promise<ArticleResponse | ApiError> {
    const url = `${API_BASE_URL}/articles`;
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: author,
                title: title,
                content: content
            })
        });

        if (!res.ok) {
            if (res.status === 404) {
                return new ApiError(ApiErrorType.NOT_FOUND);
            }
            if (res.status === 400) {
                return new ApiError(ApiErrorType.BAD_REQUEST);
            }
            return new ApiError(ApiErrorType.FAILED_REQUEST);
        }

        return await toArticleResponse(res);
    } catch {
        return new ApiError(ApiErrorType.FAILED_REQUEST);
    }
}