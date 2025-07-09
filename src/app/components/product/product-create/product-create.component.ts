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

  dataCadastro: Date = new Date();
  maxDate: Date = new Date();

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

  salvar(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Erro ao salvar produto:', error);
    });
  }

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

  cancel(): void {
    this.router.navigate(['/products']);
  }

  // Função genérica para formatar preço no padrão BR (ex: 1.234,56)
  onPrecoInput(event: any, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    let valor = event.target.value;

    // Remove tudo que não for dígito
    valor = valor.replace(/\D/g, '');

    if (valor.length === 0) {
      this.product[campo] = 0;
      event.target.value = '';
      return;
    }

    // Garante pelo menos 3 dígitos para formatação correta
    while (valor.length < 3) {
      valor = '0' + valor;
    }

    // Divide inteiro e decimal
    const inteiro = valor.slice(0, valor.length - 2);
    const decimal = valor.slice(valor.length - 2);

    // Formata inteiro com ponto como separador de milhar
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Monta valor final formatado com vírgula decimal
    const valorFormatado = `${inteiroFormatado},${decimal}`;

    // Atualiza o campo visível
    event.target.value = valorFormatado;

    // Atualiza o model convertendo para número (ex: "1.234,56" -> 1234.56)
    this.product[campo] = parseFloat(valorFormatado.replace(/\./g, '').replace(',', '.'));
  }
}
