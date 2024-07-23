import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './core/interfaces/product.interface';
import { BasketItem } from './core/interfaces/basket-item.interface';
import { FetchProductsResponse } from './core/interfaces/fetch-products-response.interface';
import { FetchBasketsResponse } from './core/interfaces/fetch-baskets-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<FetchProductsResponse> {
    return this.http.get<FetchProductsResponse>('/products');
  }

  transformProductsToBasketItems(products: Product[], basketItems: BasketItem[]): BasketItem[] {
    return products
      .map(product => {
        const basketItem = basketItems.find(item => item.ProductId === product.id);
        return basketItem ? {
          ...basketItem,
          Amount: basketItem.Amount
        } : null;
      })
      .filter(item => item && item.Amount > 0) as BasketItem[];
  }

  submitBasketItems(basketItems: BasketItem[]): Observable<any> {
    return this.http.post('/baskets', {basketItems: basketItems});
  }

  getUserBaskets(): Observable<FetchBasketsResponse> {
    return this.http.get<FetchBasketsResponse>('/baskets');
  }
}
