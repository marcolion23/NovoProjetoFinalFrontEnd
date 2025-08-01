import { Component, OnInit } from '@angular/core';

export interface Estoque {
  proId: number;
  proNome: string;
  proCodigoBarras: string;
  proDescricao: string;
  proCategoria: string;
  proMarca: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proEstoque: number;
  dataCadastro: Date;
  proAtivo: boolean;
}

@Component({
  selector: 'app-estoque-read',
  templateUrl: './estoque-read.component.html',
  styleUrls: ['./estoque-read.component.css']
})
export class EstoqueReadComponent implements OnInit {

  // Dados que alimentarão a tabela
  estoque: Estoque[] = [];

  // Colunas que aparecerão na tabela
displayedColumnsEstoque = [
  'proId',
  'proNome',
  'proCodigoBarras',
  'proDescricao',
  'proCategoria',
  'proMarca',
  'proPrecoCusto',
  'proPrecoVenda',
  'proEstoque',
  'dataCadastro',
  'proAtivo',
  'acoes'
];

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode buscar os dados do estoque, exemplo estático:
    this.estoque = [
  {
    proId: 1,
    proNome: 'Mouse Gamer RGB',
    proCodigoBarras: '1234567890123',
    proDescricao: 'Mouse com RGB e alta precisão',
    proCategoria: 'acessorios',
    proMarca: 'razer',
    proPrecoCusto: 100.00,
    proPrecoVenda: 159.90,
    proEstoque: 25,
    dataCadastro: new Date('2025-07-10'),
    proAtivo: true
  },
  {
    proId: 2,
    proNome: 'Teclado Mecânico Pro',
    proCodigoBarras: '2345678901234',
    proDescricao: 'Teclado mecânico com switches azuis',
    proCategoria: 'teclado',
    proMarca: 'hyperx',
    proPrecoCusto: 250.00,
    proPrecoVenda: 349.99,
    proEstoque: 15,
    dataCadastro: new Date('2025-07-12'),
    proAtivo: true
  },
  {
    proId: 3,
    proNome: 'Monitor 144Hz 24"',
    proCodigoBarras: '3456789012345',
    proDescricao: 'Monitor gamer 24 polegadas, 144Hz',
    proCategoria: 'monitor',
    proMarca: 'dell',
    proPrecoCusto: 900.00,
    proPrecoVenda: 1199.00,
    proEstoque: 7,
    dataCadastro: new Date('2025-07-15'),
    proAtivo: true
  }
];


  }

}
