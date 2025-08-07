import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model'; //add
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FornecedorService } from '../../fornecedor/fornecedor.service'; //add
import { Fornecedor } from '../../fornecedor/fornecedor.model'; //add

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  maxDate: Date = new Date();
  dataCadastro: Date | null = null;

  product: Product = {
    proNome: '',
    proDescricao: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidadeEstoque: 0,
    proCategoria: '',
    proCodigoBarras: '',
    proMarca: '',
    proPrecoCustoFormatado: '',
    proPrecoVendaFormatado: '',
    proAtivo: '',
    forId: 0, //add
    proDataCadastro: '' //add
  };

  fornecedores: Fornecedor[] = []; //add

  constructor(
    private productService: ProductService,
    private fornecedorService: FornecedorService, //add
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedorService.readFornecedor().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

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
      proDescricao: '',
      proPrecoCusto: 0,
      proPrecoVenda: 0,
      proQuantidadeEstoque: 0,
      proCategoria: '',
      proCodigoBarras: '',
      proMarca: '',
      proPrecoCustoFormatado: '',
      proPrecoVendaFormatado: '',
      proAtivo: '',
      forId: 0, //add
      proDataCadastro: '' //add
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
 selectedMarca: string = '';
  mostrarInputOutraMarca = false;
  marcaPersonalizada: string = '';

  onMarcaChange(valor: string) {
    if (valor === 'outra') {
      this.mostrarInputOutraMarca = true;
      this.marcaPersonalizada = '';
    } else {
      this.mostrarInputOutraMarca = false;
      this.marcaPersonalizada = '';
    }
  }
formatarMarcaPersonalizada(): void {
  if (!this.marcaPersonalizada) return;

  const texto = this.marcaPersonalizada.trim();
  this.marcaPersonalizada = texto.charAt(0).toUpperCase() + texto.slice(1);
}
limparZeroInicial() {
  if (this.product.proQuantidadeEstoque === 0) {
    this.product.proQuantidadeEstoque = null; // ou undefined para limpar o campo
  }
}
}