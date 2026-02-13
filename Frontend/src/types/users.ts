export interface GetUsersParams {
    searchTerm?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}