const API_BASE_URL = '/api';

const REVALIDATE_TAGS = ['articles'];

async function fetchAPI(path: string) {
    const url = `${API_BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function getArticles(): Promise<any> {
    return fetchAPI('/articles');
}

export async function getArticlesByUser(user: string): Promise<any> {
    const url = '/articles/search?' + new URLSearchParams({ author: user })
    return fetchAPI(url);
}

export async function getArticle(id: string): Promise<any> {
    return fetchAPI(`/articles/${id}`);
}
