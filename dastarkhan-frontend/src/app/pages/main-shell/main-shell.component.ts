import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-shell.component.html',
  styleUrl:'./main-shell.component.css',
})
export class MainShellComponent {
    get isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token');
      }
    
      logout() {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
}