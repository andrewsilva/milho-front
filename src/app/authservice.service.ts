import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient, // Injete o HttpClient
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.isAuthenticatedSubject.next(!!user);
      if (user) {
        this.checkAdmin(user.uid).then(isAdmin => {
          this.isAdminSubject.next(isAdmin);
        });
      } else {
        this.isAdminSubject.next(false);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  private async checkAdmin(uid: string): Promise<boolean> {
    try {
      // Substitua 'your-backend-url' pelo URL do seu servidor
      const response = await this.http.get<{ isAdmin: boolean }>(`https://milho-back-production.up.railway.app/is-admin?uid=${uid}`).toPromise();
      return response?.isAdmin ?? false
    } catch (error) {
      console.error('Erro ao verificar se o usuário é um administrador:', error);
      return false;
    }
  }
}
