import { Component, OnInit } from '@angular/core';

interface Fornecedor {
  forId: number;
  forNome: string;
  forCnpj: string;
  forEmail: string;
  forTelefone: string;
  forStatus: string;
}

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedores: Fornecedor[] = [];

  displayedColumns: string[] = [
    'forId', 'forNome', 'forCnpj', 'forEmail', 'forTelefone', 'forStatus', 'action'
  ];

  constructor() { }

  ngOnInit(): void {
    // Dados mock para teste — substitua com dados reais da API/backend
    this.fornecedores = [
      {
        forId: 1,
        forNome: 'Alpha Tech',
        forCnpj: '12.345.678/0001-90',
        forEmail: 'contato@alphatech.com',
        forTelefone: '(11) 91234-5678',
        forStatus: 'Ativo'
      },
      {
        forId: 2,
        forNome: 'Gamer Plus',
        forCnpj: '98.765.432/0001-00',
        forEmail: 'vendas@gamerplus.com',
        forTelefone: '(21) 99876-5432',
        forStatus: 'Inativo'
      }
    ];
  }

  editarFornecedor(fornecedor: Fornecedor): void {
    console.log('Editar fornecedor:', fornecedor);
    // Aqui você pode abrir um modal ou navegar para a página de edição
  }

  removerFornecedor(fornecedor: Fornecedor): void {
    console.log('Remover fornecedor:', fornecedor);
    // Implementar lógica para remover fornecedor, com confirmação, etc.
  }
}
