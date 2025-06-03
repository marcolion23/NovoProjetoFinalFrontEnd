import { Component, OnInit } from '@angular/core';
//importação do route para navagação a tela de produtos
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})

export class ProductCrudComponent implements OnInit {
  mostrarTabela = false;

  colunasExibidas: string[] = ['id', 'nome', 'custo', 'venda', 'acoes'];

  //construtor para configurar botao para tela de produto
  constructor(private router: Router) { }
  produtos = [
    { id: 1, nome: 'Mouse Gamer RGB', custo: 50, venda: 99 },
    { id: 2, nome: 'Teclado Mecânico', custo: 120, venda: 199 }
  ];
  ngOnInit(): void {
  }
  novoProduto() {
    alert('Abrir formulário de novo produto (você pode fazer um dialog)');
  }

  //criando interação com botoes
  navigateToProductCreate(): void{
    this.router.navigate(['/products/create'])
  }

}
