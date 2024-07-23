// src/app/shared/basket-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketStateService {
  private basketData: any;

  setBasketData(data: any) {
    this.basketData = data;
  }

  getBasketData() {
    return this.basketData;
  }
}