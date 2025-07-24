import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/produtos";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  // ✅ Exibe mensagens no topo
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  // ✅ Criação de novo produto
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // ✅ Leitura de todos os produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // ✅ Leitura de produto por ID
  readById(proId: string | number): Observable<Product> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.get<Product>(url);
  }

  // ✅ Atualização de produto
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.proId}`;
    return this.http.put<Product>(url, product);
  }

  // ✅ Exclusão de produto
  delete(proId: number): Observable<void> {
    const url = `${this.baseUrl}/${proId}`;
    return this.http.delete<void>(url);
  }

}
