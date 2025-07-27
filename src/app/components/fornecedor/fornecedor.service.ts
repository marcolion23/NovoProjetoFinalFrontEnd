import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fornecedor } from './fornecedor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private baseUrl = 'http://localhost:3000/fornecedores';  // Ajuste a URL do seu backend

  constructor(private http: HttpClient) { }

  // Listar todos os fornecedores
  getFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  // Buscar fornecedor por ID
  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  // Criar novo fornecedor
  createFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.baseUrl, fornecedor);
  }

  // Atualizar fornecedor existente
  updateFornecedor(id: number, fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.baseUrl}/${id}`, fornecedor);
  }

  // Deletar fornecedor
  deleteFornecedor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
