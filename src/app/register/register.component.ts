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
  confirmPassword: string = '';
  registrationSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password && this.password === this.confirmPassword) {
      this.authService.register(this.email, this.password).subscribe(response => {
        console.log('Registration response:', response);
        if (response) {
          this.registrationSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          alert('Registration failed');
        }
      });
    } else {
      alert('Passwords do not match');
    }
  }
}
