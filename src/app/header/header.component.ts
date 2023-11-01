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
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']); // Navegue para a página inicial ou outra página de sua escolha após o logout
    });
  }
}
