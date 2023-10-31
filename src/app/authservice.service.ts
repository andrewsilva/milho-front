import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {

  isAuthenticated = false; // Indica se o usuário está autenticado
  showLoginComponent = false; // Indica se o componente de login deve ser exibido

  login(username: string, password: string): Observable<boolean> {
    console.log('login', username);

    // Simule uma chamada assíncrona para verificar a autenticação.
    return of(username === 'admin' && password === 'admin').pipe(
      tap((authenticated) => {
        if (authenticated) {
          this.isAuthenticated = true;
          this.showLoginComponent = false;
        }
      })
    );
  }

  logout(): void {
    // Implemente a lógica de logout aqui.
    // Defina isAuthenticated como false e mostre o componente de login.
    this.isAuthenticated = false;
    this.showLoginComponent = true;
  }
}
