import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from './venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private baseUrl = 'http://localhost:3000/api/vendas'; // ajuste para sua API real

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/${id}`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Você pode adicionar outros métodos aqui, como:
  // listar(), criar(venda), atualizar(venda), etc.
}
