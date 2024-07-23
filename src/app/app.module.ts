import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BasketInputComponent } from './basket-input/basket-input.component';
import { ReceiptDisplayComponent } from './receipt-display/receipt-display.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './auth.guard';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RegisterComponent } from './register/register.component';
import { UserBasketsComponent } from './user-baskets/user-baskets.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BasketInputComponent,
    ReceiptDisplayComponent,
    LoginComponent,
    RegisterComponent,
    UserBasketsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
