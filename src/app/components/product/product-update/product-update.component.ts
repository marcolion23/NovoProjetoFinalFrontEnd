import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

 proPrecoCustoFormatado?: string;
  proPrecoVendaFormatado?: string;




  product: Product = {
    proId: 0,
    proNome: '',
    proCodigoBarras: '',
    proDescricao: '',
    proCategoria: '',
    proMarca: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proEstoque: 0,
    proAtivo: true,
    dataCadastro: new Date(),
    proMarcaPersonalizada: ''
  };

  dataCadastro: Date = new Date();

  mostrarInputOutraMarca = false;
  marcaPersonalizada: string = '';
  maxDate: Date = new Date();

  categorias: string[] = [
    'teclado', 'mouse', 'monitor', 'headset', 'mousepad', 'cadeira', 'console',
    'controle', 'notebook', 'placa-video', 'cpu', 'ram', 'fonte', 'gabinete',
    'cooler', 'jogos', 'giftcards', 'servicos', 'acessorios'
  ];

  marcas: string[] = [
    'Razer', 'Logitech', 'Redragon', 'Corsair', 'HyperX', 'outra'
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('proId');
    if (proId) {
      this.productService.readById(proId).subscribe((product: Product) => {
        this.product = product;
        this.dataCadastro = new Date(product.dataCadastro || new Date());
        this.mostrarInputOutraMarca = (product.proMarca === 'outra');
        if (this.mostrarInputOutraMarca) {
          this.marcaPersonalizada = product.proMarcaPersonalizada || '';
        }
      });
    }
  }

  salvar(): void {
    this.product.dataCadastro = this.dataCadastro;

    if (this.mostrarInputOutraMarca && this.marcaPersonalizada.trim() !== '') {
      this.product.proMarcaPersonalizada = this.marcaPersonalizada.trim();
      this.product.proMarca = 'outra';
    }

    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
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
      proEstoque: 0,
      proAtivo: true,
      dataCadastro: new Date(),
      proMarcaPersonalizada: ''
    };
    this.dataCadastro = new Date();
    this.mostrarInputOutraMarca = false;
    this.marcaPersonalizada = '';
  }

  onMarcaChange(marca: string): void {
    this.mostrarInputOutraMarca = (marca === 'outra');
    if (!this.mostrarInputOutraMarca) {
      this.marcaPersonalizada = '';
    }
  }

  apenasLetras(event: KeyboardEvent): void {
    const pattern = /[a-zA-ZÀ-ÿ\s]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  formatarNome(): void {
    if (this.product.proNome) {
      this.product.proNome = this.product.proNome
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
        .trimStart();
    }
  }

formatarDescricao(): void {
  if (this.product.proDescricao) {
    this.product.proDescricao = this.product.proDescricao
      .toLowerCase()
      .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
      .trimStart();
  }
}


  formatarMarcaPersonalizada(): void {
    if (this.marcaPersonalizada) {
      this.marcaPersonalizada = this.marcaPersonalizada
        .toLowerCase()
        .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
        .trimStart();
    }
  }

  limparZeroInicial(): void {
    if (this.product.proEstoque) {
      this.product.proEstoque = Number(String(this.product.proEstoque).replace(/^0+/, '')) || 0;
    }
  }

 

  getNomeCategoria(categoriaKey: string): string {
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
    return categorias[categoriaKey] || '';
  }

  
onPrecoInput(valorDigitado: string, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
  // Remove tudo que não for número
  let numeros = valorDigitado.replace(/\D/g, '');

  // Se vazio, zera o campo e formato
  if (!numeros) {
    this.product[campo] = 0;
    this.product[`${campo}Formatado`] = '';
    return;
  }

  // Limpa zeros à esquerda (mas mantendo ao menos 1 dígito)
  numeros = numeros.replace(/^0+/, '') || '0';

  // Ajusta para pelo menos 3 dígitos para facilitar a formatação (ex: 1 -> 001)
  numeros = numeros.padStart(3, '0');

  // Divide em inteiro e decimal (2 últimos dígitos)
  const inteiro = numeros.slice(0, -2);
  const decimal = numeros.slice(-2);

  // Formata inteiro com pontos a cada 3 dígitos
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Monta a string formatada final com R$, pontos e vírgula
  const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

  // Atualiza no model o número em float, usando ponto decimal
  this.product[campo] = parseFloat(`${inteiro}.${decimal}`);

  // Atualiza string formatada que aparece no input
  this.product[`${campo}Formatado`] = valorFormatado;
}


  formatarMoeda(valor: number): string {
  if (valor == null || isNaN(valor)) return '';
  return valor
    .toFixed(2)                 // duas casas decimais
    .replace('.', ',')          // ponto decimal vira vírgula
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');  // pontos como separador de milhar
}

}