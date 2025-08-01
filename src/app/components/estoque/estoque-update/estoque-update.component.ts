import { Component, OnInit } from '@angular/core';

// Interface detalhada para o estoque (produto)
interface Estoque {
  proId: number;
  proNome: string;
  proCodigoBarras: string;
  proDescricao: string;
  proCategoria: string;
  proMarca: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proEstoque: number;
  dataCadastro: Date;
  proAtivo: boolean;
}

@Component({
  selector: 'app-estoque-update',
  templateUrl: './estoque-update.component.html',
  styleUrls: ['./estoque-update.component.css']
})
export class EstoqueUpdateComponent implements OnInit {

  product: Estoque = {
    proId: 0,
    proNome: '',
    proCodigoBarras: '',
    proDescricao: '',
    proCategoria: '',
    proMarca: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proEstoque: 0,
    dataCadastro: new Date(),
    proAtivo: true
  };

  mostrarInputOutraMarca = false;
  marcaPersonalizada: string = '';

  proPrecoCustoFormatado: string = '';
  proPrecoVendaFormatado: string = '';

  maxDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    // Simula carregar produto para edição
    this.product = {
      proId: 1,
      proNome: 'Mouse Gamer RGB',
      proCodigoBarras: '1234567890123',
      proDescricao: 'Mouse com RGB e alta precisão',
      proCategoria: 'acessorios',
      proMarca: 'razer',
      proPrecoCusto: 100.00,
      proPrecoVenda: 159.90,
      proEstoque: 25,
      dataCadastro: new Date('2025-07-10'),
      proAtivo: true
    };

    this.proPrecoCustoFormatado = this.formatarPreco(this.product.proPrecoCusto);
    this.proPrecoVendaFormatado = this.formatarPreco(this.product.proPrecoVenda);
  }

  onMarcaChange(marca: string): void {
    this.mostrarInputOutraMarca = (marca === 'outra');
    if (!this.mostrarInputOutraMarca) {
      this.marcaPersonalizada = '';
    }
  }

  formatarNome(): void {
    if (this.product.proNome) {
      this.product.proNome = this.product.proNome.charAt(0).toUpperCase() + this.product.proNome.slice(1);
    }
  }

  formatarDescricao(): void {
    if (this.product.proDescricao) {
      this.product.proDescricao = this.product.proDescricao.charAt(0).toUpperCase() + this.product.proDescricao.slice(1);
    }
  }

  formatarMarcaPersonalizada(): void {
    if (this.marcaPersonalizada) {
      this.marcaPersonalizada = this.marcaPersonalizada.charAt(0).toUpperCase() + this.marcaPersonalizada.slice(1);
    }
  }

  apenasLetras(event: KeyboardEvent): void {
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const regex = /^[0-9]*$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  formatarPreco(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }

  onPrecoInput(event: string, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    let valor = event.replace(/[^\d.,]/g, '');
    valor = valor.replace(',', '.');
    const numero = parseFloat(valor);

    if (!isNaN(numero)) {
      this.product[campo] = numero;
      const valorFormatado = this.formatarPreco(numero);
      if (campo === 'proPrecoCusto') {
        this.proPrecoCustoFormatado = valorFormatado;
      } else {
        this.proPrecoVendaFormatado = valorFormatado;
      }
    } else {
      this.product[campo] = 0;
      if (campo === 'proPrecoCusto') {
        this.proPrecoCustoFormatado = '';
      } else {
        this.proPrecoVendaFormatado = '';
      }
    }
  }

  limparZeroInicial(): void {
    if (this.product.proEstoque) {
      this.product.proEstoque = Number(this.product.proEstoque.toString().replace(/^0+/, '')) || 0;
    }
  }

  getNomeCategoria(categoria: string): string {
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
      acessorios: 'Acessórios',
    };
    return categorias[categoria] || categoria;
  }

  salvar(): void {
    // Aqui envia para backend (exemplo console)
    console.log('Produto salvo:', this.product);
    alert('Produto salvo com sucesso!');
  }

  cancel(): void {
    this.limpar();
    console.log('Edição cancelada');
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
      dataCadastro: new Date(),
      proAtivo: true
    };
    this.mostrarInputOutraMarca = false;
    this.marcaPersonalizada = '';
    this.proPrecoCustoFormatado = '';
    this.proPrecoVendaFormatado = '';
  }
}
