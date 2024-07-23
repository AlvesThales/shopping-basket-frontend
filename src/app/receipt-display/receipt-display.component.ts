import { Component, OnInit } from '@angular/core';
import { BasketStateService } from '../shared/basket-state.service';

@Component({
  selector: 'app-receipt-display',
  templateUrl: './receipt-display.component.html',
  styleUrls: ['./receipt-display.component.css']
})
export class ReceiptDisplayComponent implements OnInit {
  basketItems: any[] = [];
  totalBasketOriginalPrice: number = 0;
  totalBasketDiscountedPrice: number = 0;

  constructor(private basketStateService: BasketStateService) {}
   
  ngOnInit() {
    const basketData = this.basketStateService.getBasketData();
    
    if (basketData) {
      console.log('@@@@ Basket Data:', basketData); 
      this.basketItems = basketData.basketItems;
      this.totalBasketOriginalPrice = basketData.totalBasketOriginalPrice;
      this.totalBasketDiscountedPrice = basketData.totalBasketDiscountedPrice;
    } else {
      console.log('No basket data found in service');
    }
  }
}
