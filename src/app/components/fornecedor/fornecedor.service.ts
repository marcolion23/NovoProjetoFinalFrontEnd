import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { Fornecedor } from './fornecedor.model';
import { Endereco } from "../endereco/endereco.model";

@Injectable({
  providedIn: 'root' // Define o serviço como singleton no root module
})
export class FornecedorService {

  private fornecedorBaseUrl = "http://localhost:8080/fornecedores";
  private contatoBaseUrl = "http://localhost:9090/contatos";
  private enderecoBaseUrl = "http://localhost:9090/enderecos";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  // Exibe uma mensagem de notificação
  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000, // Duração da mensagem em milissegundos
      horizontalPosition: "right", // Posição horizontal
      verticalPosition: "top" // Posição vertical
    });
  }

  //Fornecedor
  // Cria um novo fornecedor
  createFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.fornecedorBaseUrl, fornecedor);
  }

  // Obtém a lista de fornecedores
  readFornecedor(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.fornecedorBaseUrl);
  }

  // Obtém um fornecedor pelo ID
  readFornecedorById(id: string): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.get<Fornecedor>(url);
  }

  // Atualiza um fornecedor existente
  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${fornecedor.forId}`;
    return this.http.put<Fornecedor>(url, fornecedor);
  }

  // Exclui um fornecedor pelo ID
  deleteFornecedor(id: number): Observable<Fornecedor> {
    const url = `${this.fornecedorBaseUrl}/${id}`;
    return this.http.delete<Fornecedor>(url);
  }

  //Endereco
  createEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.enderecoBaseUrl, endereco);
  }

  readEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.enderecoBaseUrl);
  }

  readEnderecoById(id: string): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.get<Endereco>(url);
  }

  updateEndereco(endereco: Endereco): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${endereco.endId}`;
    return this.http.put<Endereco>(url, endereco);
  }

  deleteEndereco(id: number): Observable<Endereco> {
    const url = `${this.enderecoBaseUrl}/${id}`;
    return this.http.delete<Endereco>(url);
  }
}