import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketInputComponent } from './basket-input/basket-input.component';
import { ReceiptDisplayComponent } from './receipt-display/receipt-display.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { UserBasketsComponent } from './user-baskets/user-baskets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'basket', component: BasketInputComponent, canActivate: [AuthGuard] },
  { path: 'user-baskets', component: UserBasketsComponent },
  { path: 'receipt', component: ReceiptDisplayComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
