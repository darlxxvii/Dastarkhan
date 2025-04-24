import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.username, this.password, this.email).subscribe({
      next: () => {
        alert('Регистрация успешна!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Ошибка при регистрации. Попробуйте ещё раз.');
      }
    });
  }
}