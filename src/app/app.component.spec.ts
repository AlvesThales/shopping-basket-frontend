import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import RouterTestingModule
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set receipt when onReceiptGenerated is called', () => {
    const mockReceipt = { id: 1, total: 100 };
    component.onReceiptGenerated(mockReceipt);
    expect(component.receipt).toEqual(mockReceipt);
  });

  it('should reset receipt when reset is called', () => {
    component.receipt = { id: 1, total: 100 };
    component.reset();
    expect(component.receipt).toBeNull();
  });
});