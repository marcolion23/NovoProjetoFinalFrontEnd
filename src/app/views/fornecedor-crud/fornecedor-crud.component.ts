import { Component } from '@angular/core';

@Component({
  selector: 'app-fornecedor-crud',
  templateUrl: './fornecedor-crud.component.html',
  styleUrls: ['./fornecedor-crud.component.css']
})
export class FornecedorCrudComponent {

  // Propriedades para o dashboard
  totalFornecedores: number = 0;         // total de fornecedores
  fornecedoresAtivos: number = 0;        // quantidade de ativos
  fornecedoresInativos: number = 0;      // quantidade de inativos

  constructor() {
    // Exemplo: aqui depois você vai buscar do backend
    // Por enquanto, vamos simular valores:
    this.totalFornecedores = 25;
    this.fornecedoresAtivos = 20;
    this.fornecedoresInativos = 5;
  }
  
}
