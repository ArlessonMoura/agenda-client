import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../models/contato';

@Injectable({
  providedIn: 'root',
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/api/contatos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  cadastrar(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  ///VERIFICAR EXECUÇÃO
  buscarPorId(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/id/${id}`);
  }

  atualizar(id: number, contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  inativar(id: number): Observable<Contato> {
    return this.http.patch<Contato>(`${this.apiUrl}/${id}/inativar`, {});
  }

  buscarPorCelular(celular: string): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/celular/${celular}`);
  }

  buscarPorNome(nome: string): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/nome/${nome}`);
  }

  buscarPorEmail(email: string): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/email/${email}`);
  }
}
