import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  // Define as colunas visíveis da tabela
  displayedColumns: string[] = [
    'proId',
    'proNome',
    'proCategoria',
    'proPrecoCusto',
    'proPrecoVenda',
    'proEstoque',
    'proStatus',
    'proAtualizadoEm',
    'action' // Coluna de ações
  ];

  // Dados simulados de produtos (mock)
  products = [
    {
      proId: 1,
      proNome: 'Mouse Gamer RGB',
      proCategoria: 'Periféricos',
      proPrecoCusto: 80.00,
      proPrecoVenda: 139.90,
      proEstoque: 35,
      proStatus: 'Ativo',
      proAtualizadoEm: new Date()
    },
    {
      proId: 2,
      proNome: 'Teclado Mecânico',
      proCategoria: 'Periféricos',
      proPrecoCusto: 150.00,
      proPrecoVenda: 249.99,
      proEstoque: 20,
      proStatus: 'Ativo',
      proAtualizadoEm: new Date()
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // No futuro, aqui você irá chamar o backend com um service
    // this.productService.getAll().subscribe(data => this.products = data);
  }
}
