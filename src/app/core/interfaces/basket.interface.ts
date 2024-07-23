import { BasketItem } from "./basket-item.interface";

export interface Basket {
    id: string;
    customerId: string;
    basketItems: BasketItem[];
    totalBasketOriginalPrice: number;
    totalBasketDiscountedPrice: number;
    isPaid: boolean;
    isDeleted: boolean;
  }