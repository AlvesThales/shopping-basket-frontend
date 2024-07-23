import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { Product } from '../core/interfaces/product.interface';
import { BasketItem } from '../core/interfaces/basket-item.interface';
import { Router } from '@angular/router';
import { BasketStateService } from '../shared/basket-state.service';


@Component({
  selector: 'app-basket-input',
  templateUrl: './basket-input.component.html',
  styleUrls: ['./basket-input.component.css']
})
export class BasketInputComponent implements OnInit {
  products: Product[] = [];
  basketItems: BasketItem[] = [];

  constructor(private basketService: BasketService, private router: Router, private basketStateService: BasketStateService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.basketService.fetchProducts().subscribe(response => {
      this.products = response.data;
      this.initializeBasketItems();
    });
  }

  initializeBasketItems() {
    this.basketItems = this.products.map(product => this.createBasketItemFromProduct(product));
  }

  createBasketItemFromProduct(product: Product): BasketItem {
    return {
      ProductId: product.id,
      ProductName: product.name,
      UnitPrice: product.price,
      OriginalPrice: 0,
      TotalDiscount: 0,
      Amount: 0
    };
  }

  onSubmit() {
    // Filter out items with amount > 0
    const filteredBasketItems = this.basketItems.filter(item => item.Amount > 0);
  
    // Transform the filtered items
    const transformedItems = this.basketService.transformProductsToBasketItems(this.products, filteredBasketItems);
    console.log(transformedItems); // Debugging: log the transformed items
  
    // Submit the filtered and transformed items
    this.basketService.submitBasketItems(transformedItems).subscribe(response => {
      console.log('Basket items submitted successfully', response);
      this.handleSuccessfulSubmission(response);
    }, error => {
      console.error('Error submitting basket items', error);
      // Handle the error as needed, e.g., display an error message
    });
  }

  handleSuccessfulSubmission(response: any) {
    const basketData = {
      basketItems: response.data.basketItems,
      totalBasketOriginalPrice: response.data.totalBasketOriginalPrice,
      totalBasketDiscountedPrice: response.data.totalBasketDiscountedPrice
    };
  
    console.log('Navigating to receipt with data:', basketData);
    this.basketStateService.setBasketData(basketData);
  
    this.router.navigate(['/receipt']);
  }
}
