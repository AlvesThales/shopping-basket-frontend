import { Basket } from "./basket.interface";

export interface FetchBasketsResponse {
    success: boolean;
    data: Basket[];
}