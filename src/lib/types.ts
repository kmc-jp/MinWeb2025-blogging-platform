export const ApiErrorType = {
    FAILED_VALIDATION:  0,
    NOT_FOUND:          1,
    FAILED_REQUEST:     2,
} as const;

export type ApiErrorType = (typeof ApiErrorType)[keyof typeof ApiErrorType];

export class ApiError {
    public errorType: ApiErrorType;
    public message: string;

    constructor(errorType: ApiErrorType, message?: string) {
        this.errorType = errorType;
        this.message = message ?? "";
    }
}

export type ArticleResponse = {
    id: string,
    author: string,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date
}

export async function toArticlesResponse(rawResponse: Response): Promise<ArticleResponse[] | ApiError> {
    try {
        const rawResponseJson = await rawResponse.json();
        
        if (!Array.isArray(rawResponseJson)) {
            return new ApiError(ApiErrorType.FAILED_VALIDATION);
        }

        if (rawResponseJson.length === 0) {
            return new ApiError(ApiErrorType.NOT_FOUND);
        }

        const articles: ArticleResponse[] = [];
        
        for (const rawArticle of rawResponseJson) {
            const article = responseValidation(rawArticle);
            if (article instanceof ApiError) {
                return article;
            }
            articles.push(article);
        }

        return articles;
    } catch (error) {
        return new ApiError(ApiErrorType.FAILED_REQUEST);
    }
}

export async function toArticleResponse(rawResponse: Response): Promise<ArticleResponse | ApiError> {
    try {
        const rawResponseJson = await rawResponse.json();
        return responseValidation(rawResponseJson);
    } catch (error) {
        return new ApiError(ApiErrorType.FAILED_REQUEST);
    }
}

// JSONデータからArticleResponseオブジェクトに変換する関数
export function responseValidation(rawData: any): ArticleResponse | ApiError {
    // 必須フィールドの検証
    if (!rawData._id.$oid) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    if (!rawData.author.inner) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    if (!rawData.title) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    if (!rawData.content) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    if (!rawData.created_at) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    if (!rawData.updated_at) {
        return new ApiError(ApiErrorType.FAILED_VALIDATION);
    }

    const createdAt: Date = new Date(rawData.created_at);
    const updatedAt: Date = new Date(rawData.updated_at);

    let res = {
        id: rawData._id.$oid,
        author: rawData.author.inner,
        title: rawData.title,
        content: rawData.content,
        created_at: createdAt,
        updated_at: updatedAt,
    } as ArticleResponse
    
    return res;
}