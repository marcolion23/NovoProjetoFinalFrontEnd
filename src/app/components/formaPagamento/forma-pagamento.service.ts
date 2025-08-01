import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormaPagamento } from './forma-pagamento.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  baseUrl = "http://localhost:8080/fpagamentos";

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  create(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(this.baseUrl, formaPagamento).pipe(
      catchError(err => {
        this.showMessage('Erro ao criar forma de pagamento.');
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  read(): Observable<FormaPagamento[]> {
    return this.http.get<FormaPagamento[]>(this.baseUrl).pipe(
      catchError(err => {
        this.showMessage('Erro ao carregar formas de pagamento.');
        console.error(err);
        return of([]); // retorna array vazio para evitar erro na UI
      })
    );
  }

  readById(fpgId: number): Observable<FormaPagamento> {
    const url = `${this.baseUrl}/${fpgId}`;
    return this.http.get<FormaPagamento>(url).pipe(
      catchError(err => {
        this.showMessage('Erro ao carregar forma de pagamento.');
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  update(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    if (!formaPagamento.fpgId) {
      return throwError(() => new Error('FormaPagamento ID is required for update.'));
    }
    const url = `${this.baseUrl}/${formaPagamento.fpgId}`;
    return this.http.put<FormaPagamento>(url, formaPagamento).pipe(
      catchError(err => {
        this.showMessage('Erro ao atualizar forma de pagamento.');
        console.error(err);
        return throwError(() => err);
      })
    );
  }

  delete(fpgId: number): Observable<void> {
    const url = `${this.baseUrl}/${fpgId}`;
    return this.http.delete<void>(url).pipe(
      catchError(err => {
        this.showMessage('Erro ao excluir forma de pagamento.');
        console.error(err);
        return throwError(() => err);
      })
    );
  }
}
