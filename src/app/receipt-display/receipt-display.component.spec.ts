import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReceiptDisplayComponent } from './receipt-display.component';
import { BasketStateService } from '../shared/basket-state.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ReceiptDisplayComponent', () => {
  let component: ReceiptDisplayComponent;
  let fixture: ComponentFixture<ReceiptDisplayComponent>;
  let basketStateService: jasmine.SpyObj<BasketStateService>;

  beforeEach(() => {
    const basketStateServiceSpy = jasmine.createSpyObj('BasketStateService', ['getBasketData']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ReceiptDisplayComponent],
      providers: [
        { provide: BasketStateService, useValue: basketStateServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(ReceiptDisplayComponent);
    component = fixture.componentInstance;
    basketStateService = TestBed.inject(BasketStateService) as jasmine.SpyObj<BasketStateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize basket data on init', () => {
    const mockBasketData = {
      basketItems: [
        { productName: 'Product 1', unitPrice: 10, amount: 2, totalDiscount: 1, originalPrice: 20, discountedPrice: 19 },
        { productName: 'Product 2', unitPrice: 15, amount: 1, totalDiscount: 0, originalPrice: 15, discountedPrice: 15 }
      ],
      totalBasketOriginalPrice: 35,
      totalBasketDiscountedPrice: 34
    };

    basketStateService.getBasketData.and.returnValue(mockBasketData);

    fixture.detectChanges();

    expect(component.basketItems.length).toBe(2);
    expect(component.totalBasketOriginalPrice).toBe(35);
    expect(component.totalBasketDiscountedPrice).toBe(34);
  });

  it('should display basket items', () => {
    const mockBasketData = {
      basketItems: [
        { productName: 'Product 1', unitPrice: 10, amount: 2, totalDiscount: 1, originalPrice: 20, discountedPrice: 19 },
        { productName: 'Product 2', unitPrice: 15, amount: 1, totalDiscount: 0, originalPrice: 15, discountedPrice: 15 }
      ],
      totalBasketOriginalPrice: 35,
      totalBasketDiscountedPrice: 34
    };

    basketStateService.getBasketData.and.returnValue(mockBasketData);

    fixture.detectChanges();

    const basketItems = fixture.debugElement.queryAll(By.css('.receipt-item'));
    expect(basketItems.length).toBe(2);

    const firstItem = basketItems[0].nativeElement;
    expect(firstItem.textContent).toContain('Product 1');
    expect(firstItem.textContent).toContain('€10.00');
    expect(firstItem.textContent).toContain('2');
    expect(firstItem.textContent).toContain('€1.00');
    expect(firstItem.textContent).toContain('€20.00');
    expect(firstItem.textContent).toContain('€19.00');
  });

  it('should display total prices', () => {
    const mockBasketData = {
      basketItems: [],
      totalBasketOriginalPrice: 35,
      totalBasketDiscountedPrice: 34
    };

    basketStateService.getBasketData.and.returnValue(mockBasketData);

    fixture.detectChanges();

    const totalOriginalPrice = fixture.debugElement.query(By.css('.total:nth-of-type(1) span:nth-of-type(2)')).nativeElement;
    const totalDiscountedPrice = fixture.debugElement.query(By.css('.total:nth-of-type(2) span:nth-of-type(2)')).nativeElement;

    expect(totalOriginalPrice.textContent).toContain('€35.00');
    expect(totalDiscountedPrice.textContent).toContain('€34.00');
  });
});