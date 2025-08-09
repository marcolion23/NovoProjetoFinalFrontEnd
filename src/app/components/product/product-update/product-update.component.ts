import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { FornecedorService } from '../../fornecedor/fornecedor.service'; // add
import { Fornecedor } from '../../fornecedor/fornecedor.model'; // add

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  maxDate: Date = new Date();
  dataCadastro: Date | null = null;

  fornecedores: Fornecedor[] = []; // add

  selectedMarca: string = '';
  mostrarInputOutraMarca = false;
  marcaPersonalizada: string = '';

  product: Product = {
    proId: 0,
    proNome: '',
    proCodigoBarras: '',
    proDescricao: '',
    proCategoria: '',
    proMarca: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proQuantidadeEstoque: 0,
    forId: 0, // add
    proDataCadastro: '',
    proMarcaPersonalizada: '',
    proPrecoCustoFormatado: '',
    proPrecoVendaFormatado: ''
  };

  constructor(
    private productService: ProductService,
    private fornecedorService: FornecedorService, // add
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('proId');
    if (proId) {
      this.productService.readById(proId).subscribe((product: Product) => {
        this.product = product;
        this.dataCadastro = new Date(product.proDataCadastro || new Date());
        this.mostrarInputOutraMarca = (product.proMarca === 'outra');
        if (this.mostrarInputOutraMarca) {
          this.marcaPersonalizada = product.proMarcaPersonalizada || '';
        }
      });
    }

    this.fornecedorService.readFornecedor().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

  salvar(): void {
    this.product.proDataCadastro = this.dataCadastro ? this.dataCadastro.toISOString() : '';

    if (this.mostrarInputOutraMarca && this.marcaPersonalizada.trim() !== '') {
      this.product.proMarca = 'outra';
      this.product.proMarcaPersonalizada = this.marcaPersonalizada.trim();
    }

    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    }, error => {
      console.error('Erro ao atualizar produto:', error);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  limpar(): void {
    this.product = {
      proId: 0,
      proNome: '',
      proCodigoBarras: '',
      proDescricao: '',
      proCategoria: '',
      proMarca: '',
      proPrecoCusto: 0,
      proPrecoVenda: 0,
      proQuantidadeEstoque: 0,
      forId: 0,
      proDataCadastro: '',
      proMarcaPersonalizada: '',
      proPrecoCustoFormatado: '',
      proPrecoVendaFormatado: ''
    };
    this.dataCadastro = null;
    this.mostrarInputOutraMarca = false;
    this.marcaPersonalizada = '';
  }

  getNomeCategoria(valor: string): string {
    const categorias: { [key: string]: string } = {
      teclado: 'Teclado',
      mouse: 'Mouse',
      monitor: 'Monitor',
      headset: 'Headset',
      mousepad: 'MousePad',
      cadeira: 'Cadeira Gamer',
      console: 'Console',
      controle: 'Controle',
      notebook: 'Notebook Gamer',
      'placa-video': 'Placa de Vídeo',
      cpu: 'Processador (CPU)',
      ram: 'Memória RAM',
      fonte: 'Fonte',
      gabinete: 'Gabinete',
      cooler: 'Cooler / WaterCooler',
      jogos: 'Jogos',
      giftcards: 'Gift Cards',
      servicos: 'Serviços Técnicos',
      acessorios: 'Acessórios'
    };
    return categorias[valor] || '';
  }

  onPrecoInput(valorDigitado: string, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    let valor = valorDigitado.replace(/\D/g, '');

    if (!valor) {
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
      inteiro = valor.slice(0, -2);
      decimal = valor.slice(-2);
    }

    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

    this.product[campo] = parseFloat(`${inteiro}.${decimal}`);
    this.product[`${campo}Formatado`] = valorFormatado;
  }

  apenasLetras(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[0-9]$/;
    const input = event.target as HTMLInputElement;

    if (!regex.test(char) || (input.value.length >= 13 && !this.isAllowedKey(event))) {
      event.preventDefault();
    }
  }

  isAllowedKey(event: KeyboardEvent): boolean {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    return allowedKeys.includes(event.key);
  }

  formatarNome(): void {
    if (!this.product.proNome) return;
    const palavras = this.product.proNome.split(' ');
    this.product.proNome = palavras
      .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  }

  formatarDescricao(): void {
    if (!this.product.proDescricao) return;
    const texto = this.product.proDescricao.trim();
    this.product.proDescricao = texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  formatarMarcaPersonalizada(): void {
    if (!this.marcaPersonalizada) return;
    const texto = this.marcaPersonalizada.trim();
    this.marcaPersonalizada = texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  onMarcaChange(valor: string) {
    if (valor === 'outra') {
      this.mostrarInputOutraMarca = true;
      this.marcaPersonalizada = '';
    } else {
      this.mostrarInputOutraMarca = false;
      this.marcaPersonalizada = '';
    }
  }

  limparZeroInicial() {
    if (this.product.proQuantidadeEstoque === 0) {
      this.product.proQuantidadeEstoque = null;
    }
  }
}