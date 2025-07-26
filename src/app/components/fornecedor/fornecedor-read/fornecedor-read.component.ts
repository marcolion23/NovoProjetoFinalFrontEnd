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
  selector: 'app-fornecedor-read',
  templateUrl: './fornecedor-read.component.html',
  styleUrls: ['./fornecedor-read.component.css']
})
export class FornecedorReadComponent implements OnInit {

  fornecedores: Fornecedor[] = [];    // Dados que serão exibidos na tabela
  displayedColumns: string[] = [      // Colunas da tabela na ordem desejada
    'forId', 'forNome', 'forCnpj', 'forEmail', 'forTelefone', 'forStatus', 'action'
  ];

  constructor() { }

  ngOnInit(): void {
    // Simulando dados carregados (você pode trocar para chamada API real)
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
    // Aqui você implementa a lógica para editar fornecedor (ex: navegação, modal, etc)
    console.log('Editar fornecedor:', fornecedor);
  }

  removerFornecedor(fornecedor: Fornecedor): void {
    // Implementar lógica de remoção (ex: confirmação e remoção do array ou API)
    console.log('Remover fornecedor:', fornecedor);
  }

}
