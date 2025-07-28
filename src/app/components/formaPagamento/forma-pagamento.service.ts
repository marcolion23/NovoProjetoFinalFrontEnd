import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormaPagamento } from './formaPagamento.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  // URL base do backend para forma de pagamentos
  baseUrl = "http://localhost:8080/fpagamentos";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  // Exibe mensagem rápida no topo direito da tela
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  // Cria uma nova forma de pagamento (POST)
  create(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(this.baseUrl, formaPagamento);
  }

  // Lê todas as formas de pagamento (GET)
  read(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.baseUrl);
  }

  // Lê uma forma de pagamento pelo ID (GET)
  readById(fpgId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${fpgId}`;
    return this.http.get<FormaPagamento>(url);
  }

  // Atualiza uma forma de pagamento pelo ID (PUT)
  update(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    if (!formaPagamento.fpgId) {
      throw new Error('FormaPagamento ID is required for update.');
    }
    const url = `${this.baseUrl}/${formaPagamento.fpgId}`;
    return this.http.put<FormaPagamento>(url, formaPagamento);
  }

  // Remove uma forma de pagamento pelo ID (DELETE)
  delete(fpgId: number): Observable<void> {
    const url = `${this.baseUrl}/${fpgId}`;
    return this.http.delete<void>(url);
  }
}
