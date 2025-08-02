import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../estoque.service';
import { EstoqueModel } from '../estoque.model';

@Component({
  selector: 'app-estoque-update',
  templateUrl: './estoque-update.component.html',
  styleUrls: ['./estoque-update.component.css']
})
export class EstoqueUpdateComponent implements OnInit {

  product: EstoqueModel = {
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

  marcaPersonalizada: string = '';
  mostrarInputOutraMarca: boolean = false;
  maxDate: Date = new Date();
  dataCadastro: Date = new Date();

  categorias: string[] = [
    'teclado', 'mouse', 'monitor', 'headset', 'mousepad', 'cadeira', 'console',
    'controle', 'notebook', 'placa-video', 'cpu', 'ram', 'fonte', 'gabinete',
    'cooler', 'jogos', 'giftcards', 'servicos', 'acessorios'
  ];

  marcas: string[] = [
    'Razer', 'Logitech', 'Redragon', 'Corsair', 'HyperX', 'outra'
  ];

  constructor(
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estoqueService.getEstoqueById(Number(id)).subscribe((res: EstoqueModel) => {
        this.product = res;
        this.dataCadastro = new Date(res.dataCadastro || new Date());
        this.mostrarInputOutraMarca = (this.product.proMarca === 'outra');
        if (this.mostrarInputOutraMarca) {
          this.marcaPersonalizada = this.product.proMarcaPersonalizada || '';
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

    this.estoqueService.updateEstoque(this.product.proId, this.product).subscribe(() => {
      // Aqui pode mostrar mensagem se tiver service de alertas
      this.router.navigate(['/estoque']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/estoque']);
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
    const inputChar = event.key;
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = event.key;
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
    const mapCategorias: { [key: string]: string } = {
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
    return mapCategorias[categoriaKey] || '';
  }

  onPrecoInput(valorDigitado: string, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    let numeros = valorDigitado.replace(/\D/g, '');

    if (!numeros) {
      this.product[campo] = 0;
      this.product[`${campo}Formatado`] = '';
      return;
    }

    numeros = numeros.replace(/^0+/, '') || '0';
    numeros = numeros.padStart(3, '0');

    const inteiro = numeros.slice(0, -2);
    const decimal = numeros.slice(-2);

    const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

    this.product[campo] = parseFloat(`${inteiro}.${decimal}`);

    this.product[`${campo}Formatado`] = valorFormatado;
  }

  // Getters para valores formatados (exibidos em template)
get proPrecoCustoFormatado(): string {
  return 'R$ ' + this.product.proPrecoCusto.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

get proPrecoVendaFormatado(): string {
  return 'R$ ' + this.product.proPrecoVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

}
