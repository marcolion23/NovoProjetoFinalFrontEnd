import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // Variável de data de cadastro (opcional, caso queira mostrar no formulário)
  dataCadastro: Date = new Date();
  maxDate: Date = new Date();

  // Objeto do Produto
  product: Product = {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proCategoria: '',
    proMarca: '',
    proCodigoBarras: '',
    proEstoque: 0,
    proAtivo: true
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Caso queira fazer algo ao iniciar o componente
  }

  // Método para salvar (criar produto no backend)
  salvar(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Erro ao salvar produto:', error);
    });
  }

  // Método para limpar o formulário
  limpar(): void {
    this.product = {
      proNome: '',
      proPrecoCusto: 0,
      proPrecoVenda: 0,
      proCategoria: '',
      proMarca: '',
      proCodigoBarras: '',
      proEstoque: 0,
      proAtivo: true
    };
  }

  // Método para cancelar e voltar para a listagem de produtos
  cancel(): void {
    this.router.navigate(['/products']);
  }

}
