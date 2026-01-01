// Types common in API services

export interface ApiResponse<T> {
    data: T,
    meta?: {
        totalCount?: number;
    }
}
// export interface ApiResponse<T> {
//     data: {
//         products: T[],
//         limit: number,
//         skip: number,
//         total: number
//     },
//     meta?: {
//         totalCount?: number;
//     }
// }