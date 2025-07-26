import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  maxDate: Date = new Date();
  dataCadastro: Date | null = null;

  product: any = {
    proNome: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proPrecoCustoFormatado: '',
    proPrecoVendaFormatado: '',
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

  ngOnInit(): void {}

  salvar(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Erro ao salvar produto:', error);
    });
  }
getNomeCategoria(valor: string): string {
  switch (valor) {
    case 'teclado': return 'Teclado';
    case 'mouse': return 'Mouse';
    case 'monitor': return 'Monitor';
    case 'headset': return 'Headset';
    case 'mousepad': return 'MousePad';
    case 'cadeira': return 'Cadeira Gamer';
    case 'console': return 'Console';
    case 'controle': return 'Controle';
    case 'acessorios': return 'Acessórios';

    // Novas categorias adicionadas
    case 'notebook': return 'Notebook Gamer';
    case 'placa-video': return 'Placa de Vídeo';
    case 'cpu': return 'Processador (CPU)';
    case 'ram': return 'Memória RAM';
    case 'fonte': return 'Fonte';
    case 'gabinete': return 'Gabinete';
    case 'cooler': return 'Cooler / WaterCooler';
    case 'jogos': return 'Jogos';
    case 'giftcards': return 'Gift Cards';
    case 'servicos': return 'Serviços Técnicos';

    default: return '';
  }
}

  limpar(): void {
    this.product = {
      proNome: '',
      proPrecoCusto: 0,
      proPrecoVenda: 0,
      proPrecoCustoFormatado: '',
      proPrecoVendaFormatado: '',
      proCategoria: '',
      proMarca: '',
      proCodigoBarras: '',
      proEstoque: 0,
      proAtivo: true
    };
    this.dataCadastro = null; // limpa também a data de cadastro
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  onPrecoInput(valorDigitado: string, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    let valor = valorDigitado.replace(/\D/g, '');

    if (valor.length === 0) {
      this.product[campo] = 0;
      this.product[`${campo}Formatado`] = '';
      return;
    }

    while (valor.length > 3 && valor.startsWith('0')) {
      valor = valor.substring(1);
    }

    let inteiro = '';
    let decimal = '';

    if (valor.length === 1) {
      inteiro = '0';
      decimal = '0' + valor;
    } else if (valor.length === 2) {
      inteiro = '0';
      decimal = valor;
    } else {
      inteiro = valor.slice(0, valor.length - 2);
      decimal = valor.slice(valor.length - 2);
    }

    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

    this.product[campo] = parseFloat(`${inteiro}.${decimal}`);
    this.product[`${campo}Formatado`] = valorFormatado;
  }

  // Permite apenas letras, espaços e acentos
  apenasLetras(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  // Permite apenas números e limita o tamanho do código de barras para 13 caracteres
  apenasNumeros(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[0-9]$/;
    const input = event.target as HTMLInputElement;

    if (!regex.test(char) || (input.value.length >= 13 && !this.isAllowedKey(event))) {
      event.preventDefault();
    }
  }

  // Permite teclas especiais para edição e navegação no input
  isAllowedKey(event: KeyboardEvent): boolean {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    return allowedKeys.includes(event.key);
  }

formatarNome(): void {
  if (!this.product.proNome) return;

  const palavras = this.product.proNome.split(' ');
  this.product.proNome = palavras
    .map((palavra: string) => {  // Declara o tipo aqui
      if (palavra.length === 0) return '';
      return palavra[0].toUpperCase() + palavra.slice(1).toLowerCase();
    })
    .join(' ');
}
formatarDescricao(): void {
  if (!this.product.proDescricao) return;

  const texto = this.product.proDescricao.trim();
  this.product.proDescricao =
    texto.charAt(0).toUpperCase() + texto.slice(1);
}

  }
