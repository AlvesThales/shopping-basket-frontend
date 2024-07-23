import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { Basket } from '../core/interfaces/basket.interface';
import { BasketStateService } from '../shared/basket-state.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-baskets',
  templateUrl: './user-baskets.component.html',
  styleUrls: ['./user-baskets.component.css']
})
export class UserBasketsComponent implements OnInit {
  baskets: Basket[] = [];

  constructor(private basketService: BasketService, 
    private basketStateService: BasketStateService,
    private router: Router,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.basketService.getUserBaskets().subscribe(response => {
        this.baskets = response.data;
      }
    );
  }

  viewReceipt(basket: any): void {
    this.basketStateService.setBasketData(basket);
    this.router.navigate(['/receipt']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}