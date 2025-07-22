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

  // Método para formatar número no padrão brasileiro com R$
  formatarReal(valor: number): string {
    if (valor === null || valor === undefined || valor === 0) return '';
    // Formata com separador de milhar (.) e decimal (,), ex: R$ 25.000,00
    return 'R$ ' + valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // Função para formatar preço em tempo real no padrão brasileiro com R$
  onPrecoInput(event: Event, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // Remove tudo que não for dígito
    valor = valor.replace(/\D/g, '');

    if (valor.length === 0) {
      this.product[campo] = 0;
      input.value = '';
      return;
    }

    // Garante pelo menos 3 dígitos para formatação correta (ex: 000)
    while (valor.length < 3) {
      valor = '0' + valor;
    }

    // Divide parte inteira e decimal
    const inteiro = valor.slice(0, valor.length - 2);
    const decimal = valor.slice(valor.length - 2);

    // Formata inteiro com separador de milhares
    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Monta o valor final formatado com R$
    const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

    // Atualiza valor visível no input
    input.value = valorFormatado;

    // Atualiza o model convertendo para número float (ex: "25000,00" => 25000.00)
    this.product[campo] = parseFloat((inteiro + decimal) ? `${inteiro}${decimal}`.replace(/^0+/, '') : '0') / 100;
  }
}
