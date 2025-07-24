import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = "http://localhost:8080/clientes";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  // ✅ Exibe mensagem no canto superior direito
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  // ✅ Cria novo cliente
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  // ✅ Busca todos os clientes
  read(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  // ✅ Busca cliente por ID
  readById(cliId: string | number): Observable<Cliente> {
    const url = `${this.baseUrl}/${cliId}`;
    return this.http.get<Cliente>(url);
  }

  // ✅ Atualiza cliente
  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/${cliente.cliId}`;
    return this.http.put<Cliente>(url, cliente);
  }

  // ✅ Exclui cliente
  delete(cliId: number): Observable<void> {
    const url = `${this.baseUrl}/${cliId}`;
    return this.http.delete<void>(url);
  }

}
