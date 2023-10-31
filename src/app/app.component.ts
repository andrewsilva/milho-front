import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'milho';
  showLoginModal = false;

  openLoginModal() {
    this.showLoginModal = true;
  }

  // Função para fechar o modal
  closeLoginModal() {
    this.showLoginModal = false;
  }
}
