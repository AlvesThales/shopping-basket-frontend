import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasketsComponent } from './user-baskets.component';

describe('UserBasketsComponent', () => {
  let component: UserBasketsComponent;
  let fixture: ComponentFixture<UserBasketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBasketsComponent]
    });
    fixture = TestBed.createComponent(UserBasketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
