import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      this.authService.register(this.email, this.password).subscribe(response => {
        console.log('Registration response:', response);
        if (response) {
          this.router.navigate(['/login']);
        } else {
          alert('Registration failed');
        }
      });
    }
  }
}