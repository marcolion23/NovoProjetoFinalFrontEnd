import { Component, OnInit } from '@angular/core';

interface Venda {
  vendaId: number;
  clienteNome: string;
  produtoNome: string;
  quantidade: number;
  valorTotal: number;
  dataVenda: Date;
}

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements OnInit {

  // Colunas que serão exibidas na tabela, na ordem desejada
  displayedColumns: string[] = [
    'vendaId',
    'clienteNome',
    'produtoNome',
    'quantidade',
    'valorTotal',
    'dataVenda',
    'action'
  ];

  // Dados simulados de vendas
  vendas: Venda[] = [];

  constructor() { }

  ngOnInit(): void {
    // Inicialização dos dados (simulação)
    this.vendas = [
      {
        vendaId: 1,
        clienteNome: 'João Silva',
        produtoNome: 'Teclado Gamer RGB',
        quantidade: 2,
        valorTotal: 300.00,
        dataVenda: new Date(2025, 7, 1), // Agosto (mês começa em 0)
      },
      {
        vendaId: 2,
        clienteNome: 'Maria Souza',
        produtoNome: 'Mouse Sem Fio',
        quantidade: 1,
        valorTotal: 120.50,
        dataVenda: new Date(2025, 7, 3),
      },
      {
        vendaId: 3,
        clienteNome: 'Carlos Pereira',
        produtoNome: 'Headset Gamer',
        quantidade: 1,
        valorTotal: 250.75,
        dataVenda: new Date(2025, 7, 5),
      }
    ];
  }
}
