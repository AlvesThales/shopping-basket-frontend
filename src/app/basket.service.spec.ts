import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BasketService } from './basket.service';
import { environment } from '../environments/environment';
import { FetchProductsResponse } from './core/interfaces/fetch-products-response.interface'
import { FetchBasketsResponse } from './core/interfaces/fetch-baskets-response.interface'
import { Product } from './core/interfaces/product.interface'
import { BasketItem } from './core/interfaces/basket-item.interface'

describe('BasketService', () => {
  let service: BasketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BasketService]
    });

    service = TestBed.inject(BasketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockResponse: FetchProductsResponse = { success: true, data: [] };

    service.fetchProducts().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.HOST_URL}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should transform products to basket items', () => {
    const products: Product[] = [
      { id: '1', name: 'Product 1', price: 10, amount: 2 },
      { id: '2', name: 'Product 2', price: 15, amount: 1 }
    ];
    const basketItems: BasketItem[] = [
      { ProductId: '1', ProductName: 'Product 1', UnitPrice: 10, Amount: 2, TotalDiscount: 1, OriginalPrice: 20 },
      { ProductId: '2', ProductName: 'Product 2', UnitPrice: 15, Amount: 1, TotalDiscount: 0, OriginalPrice: 15 }
    ];

    const transformedItems = service.transformProductsToBasketItems(products, basketItems);
    expect(transformedItems.length).toBe(2);
    expect(transformedItems[0].Amount).toBe(2);
    expect(transformedItems[1].Amount).toBe(1);
  });

  it('should submit basket items', () => {
    const basketItems: BasketItem[] = [
      { ProductId: '1', ProductName: 'Product 1', UnitPrice: 10, Amount: 2, TotalDiscount: 1, OriginalPrice: 20 }
    ];
    const mockResponse = { success: true };

    service.submitBasketItems(basketItems).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.HOST_URL}/baskets`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ basketItems: basketItems });
    req.flush(mockResponse);
  });

  it('should fetch user baskets', () => {
    const mockResponse: FetchBasketsResponse = { success: true, data: [] };

    service.getUserBaskets().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.HOST_URL}/baskets`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});