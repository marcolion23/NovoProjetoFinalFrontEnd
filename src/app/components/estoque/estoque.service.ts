import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { EstoqueModel } from './estoque.model'; // importe seu model aqui

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private estoqueDB: EstoqueModel[] = [
    // produtos simulados
  ];

  constructor() { }

  getEstoque(): Observable<EstoqueModel[]> {
    return of(this.estoqueDB);
  }

  getEstoqueById(id: number): Observable<EstoqueModel> {
    const produto = this.estoqueDB.find(p => p.proId === id);
    if (produto) {
      return of(produto);
    } else {
      return throwError(() => new Error('Produto não encontrado'));
    }
  }

  createEstoque(produto: Omit<EstoqueModel, 'proId'>): Observable<EstoqueModel> {
    const novoId = this.estoqueDB.length > 0 ? Math.max(...this.estoqueDB.map(p => p.proId)) + 1 : 1;
    const novoProduto = { ...produto, proId: novoId };
    this.estoqueDB.push(novoProduto);
    return of(novoProduto);
  }

  updateEstoque(id: number, dados: Partial<EstoqueModel>): Observable<EstoqueModel> {
    const index = this.estoqueDB.findIndex(p => p.proId === id);
    if (index !== -1) {
      this.estoqueDB[index] = { ...this.estoqueDB[index], ...dados };
      return of(this.estoqueDB[index]);
    } else {
      return throwError(() => new Error('Produto não encontrado para atualização'));
    }
  }

  deleteEstoque(id: number): Observable<void> {
    const index = this.estoqueDB.findIndex(p => p.proId === id);
    if (index !== -1) {
      this.estoqueDB.splice(index, 1);
      return of(void 0);
    } else {
      return throwError(() => new Error('Produto não encontrado para exclusão'));
    }
  }
  
}
