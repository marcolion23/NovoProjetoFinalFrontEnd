import { Component, OnInit } from '@angular/core';

interface Cliente {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Venda {
  id?: number | null;
  clienteId?: number | null;
  dataVenda?: Date | null;
  tipoPagamento?: string;
  valorTotal?: number;
  valorTotalFormatado?: string;

}

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {

  venda: Venda = {
    clienteId: null,
    dataVenda: null,
    tipoPagamento: '',
    valorTotal: 0,
    valorTotalFormatado: '0,00',
    
  };

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteFiltro: string = '';
  maxDate: Date = new Date();

  // Novas propriedades relacionadas ao erro do HTML:
  produtos: Produto[] = [];
  produtoSelecionado: Produto | null = null;
  quantidadeProduto: number = 1;

  constructor() {}

  ngOnInit(): void {
    // Clientes mockados
    this.clientes = [
      { id: 1, nome: 'João Silva' },
      { id: 2, nome: 'Maria Oliveira' },
      { id: 3, nome: 'Carlos Souza' },
      { id: 4, nome: 'Ana Pereira' }
    ];
    this.clientesFiltrados = this.clientes;

    // Produtos mockados (simulando backend)
    this.produtos = [
      { id: 1, nome: 'Produto A', preco: 50 },
      { id: 2, nome: 'Produto B', preco: 75.5 },
      { id: 3, nome: 'Produto C', preco: 120.99 }
    ];
  }

  compareClientes(c1: Cliente, c2: Cliente): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  filtrarClientes(): void {
    const filtro = this.clienteFiltro.toLowerCase().trim();
    if (!filtro) {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(c =>
        c.nome.toLowerCase().includes(filtro)
      );
    }
  }

  onClienteSelectOpened(opened: boolean): void {
    if (opened) {
      this.clienteFiltro = '';
      this.filtrarClientes();
    }
  }

  atualizarValorTotal(): void {
    if (this.produtoSelecionado && this.quantidadeProduto > 0) {
      const valor = this.produtoSelecionado.preco * this.quantidadeProduto;
      const inteiro = Math.floor(valor).toString();
      const decimal = Math.round((valor % 1) * 100).toString().padStart(2, '0');
      const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      const valorFormatado = `R$ ${inteiroFormatado},${decimal}`;

      this.venda.valorTotal = valor;
      this.venda.valorTotalFormatado = valorFormatado;
    } else {
      this.venda.valorTotal = 0;
      this.venda.valorTotalFormatado = '0,00';
    }
  }

 onPrecoInput(valorDigitado: string, campo: 'valorTotal'): void {
  let valor = valorDigitado.replace(/\D/g, ''); // Remove tudo que não for número

  if (valor.length === 0) {
    this.venda[campo] = 0;
    this.venda[`${campo}Formatado`] = '';
    return;
  }

  // Remove zeros à esquerda, mantendo pelo menos 3 dígitos
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

  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Insere pontos como separadores de milhar
  const valorFormatado = `R$ ${inteiroFormatado},${decimal}`; // Formato final: R$ 1.234,56

  this.venda[campo] = parseFloat(`${inteiro}.${decimal}`); // Armazena o número real (ex: 1234.56)
  this.venda[`${campo}Formatado`] = valorFormatado; // Armazena o texto formatado (ex: R$ 1.234,56)
}


  apenasNumeros(event: KeyboardEvent): void {
    const allowedChars = /[0-9]/;
    const tecla = event.key;
    if (!allowedChars.test(tecla)) {
      event.preventDefault();
    }
  }

  apenasLetras(event: KeyboardEvent): void {
    const char = event.key;
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  salvarVenda(): void {
    if (!this.venda.clienteId || !this.venda.dataVenda || !this.venda.tipoPagamento ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Venda salva:', this.venda);
    alert('Venda salva com sucesso!');
    this.limpar();
  }

  cancel(): void {
    console.log('Operação cancelada.');
  }

  limpar(): void {
    this.venda = {
      clienteId: null,
      dataVenda: null,
      tipoPagamento: '',
      valorTotal: 0,
      valorTotalFormatado: '0,00',
   
    };

    this.produtoSelecionado = null;
    this.quantidadeProduto = 1;
  }
}
