const API_BASE_URL = 'https://minweb2025-blogging-platform-backend-975320007014.asia-northeast2.run.app/api';

async function fetchAPI(path: string) {
    const url = `${API_BASE_URL}${path}`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return res.json();
}

export async function getArticles(): Promise<any> {
    return fetchAPI('/articles');
}

export async function getArticlesByUser(user: string): Promise<any> {
    return fetchAPI(`/articles/${user}`);
}

export async function getArticle(user: string, id: string): Promise<any> {
    return fetchAPI(`/articles/${user}/${id}`);
