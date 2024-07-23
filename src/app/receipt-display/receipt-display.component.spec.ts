import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptDisplayComponent } from './receipt-display.component';

describe('ReceiptDisplayComponent', () => {
  let component: ReceiptDisplayComponent;
  let fixture: ComponentFixture<ReceiptDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptDisplayComponent]
    });
    fixture = TestBed.createComponent(ReceiptDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
