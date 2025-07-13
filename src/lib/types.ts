export const ApiError = {
    INVALID_RESPONSE: "invalid response",
    FAILED_REQUEST_404: "failed request (404)",
    FAILED_REQUEST: "failed request (other)",
} as const;

export type ApiErrorType = (typeof ApiError)[keyof typeof ApiError];

export type getArticleResponse = {
    id: string,
    author: string,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date
}

export async function toGetArticleResponse(rawResponse: Response): Promise<getArticleResponse | ApiError> {
    const rawResponseJson = await rawResponse.json();

    if (!rawResponseJson._id) {
        return ApiError.INVALID_RESPONSE;
	}

    if (!rawResponseJson.author) {
        return ApiError.INVALID_RESPONSE;
    }

    if (!rawResponseJson.title) {
        return ApiError.INVALID_RESPONSE;
    }

    if (!rawResponseJson.content) {
        return ApiError.INVALID_RESPONSE;
    }

    if (!rawResponseJson.created_at) {
        return ApiError.INVALID_RESPONSE;
    }

    if (!rawResponseJson.updated_at) {
        return ApiError.INVALID_RESPONSE;
    }

    return {
        id: rawResponseJson._id,
        author: rawResponseJson.author,
        title: rawResponseJson.title,
        content: rawResponseJson.content,
        created_at: new Date(rawResponseJson.created_at),
        updated_at: new Date(rawResponseJson.updated_at),
    }
}