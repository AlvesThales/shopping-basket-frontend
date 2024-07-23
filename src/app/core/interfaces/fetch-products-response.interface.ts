import { Product } from "./product.interface";

export interface FetchProductsResponse {
    success: boolean;
    data: Product[];
}