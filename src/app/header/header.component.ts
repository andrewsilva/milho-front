import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public authService: AuthserviceService, private router: Router) {}

  showLogin() {
    this.router.navigate(['/login'])
    this.authService.showLoginComponent = true;
  }

  logout() {
    // Implemente a lógica para efetuar o logout do usuário, definir isAuthenticated como false e esconder o componente de login
    this.authService.isAuthenticated = false;
    this.authService.showLoginComponent = false;
  }
}
