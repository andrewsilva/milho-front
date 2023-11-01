import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApoiosService {
  public formularioIncluido = new EventEmitter<void>();

  private apiUrl = 'http://localhost:3000/api'; // Substitua pela URL do seu endpoint Node.js

  constructor(private http: HttpClient) {}

  enviarFormulario(formulario: any) {
    return this.http.post(`${this.apiUrl}/incluir-formulario`, formulario);
  }

  listarFormularios() {
    return this.http.get(`${this.apiUrl}/listar-formularios`);
  }

  deduzirValores(id: string, valoresDeducao: any): Observable<any> {
    console.log('id', id)
    console.log('valores', valoresDeducao)
    return this.http.post(`${this.apiUrl}/deduzir-formulario/${id}`, valoresDeducao);
  }

  excluirRegistro(id: string): Observable<any> {
    const url = `${this.apiUrl}/excluir-formulario/${id}`;
    return this.http.delete(url);
  }

}
