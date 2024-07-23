import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user-baskets']);
    }
  }
  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response) {
        this.router.navigate(['/user-baskets']);
      } else {
        alert('Login failed');
      }
    });
  }
}
