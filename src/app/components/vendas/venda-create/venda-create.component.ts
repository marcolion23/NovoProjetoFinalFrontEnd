import { Component, OnInit } from '@angular/core';

interface Cliente {
  id: number;
  nome: string;
}

interface Venda {
  clienteId?: number | null;
  dataVenda?: Date | null;
  tipoPagamento?: string;
  valorTotal?: number;
  status?: string;
  observacao?: string;
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
    status: '',
    observacao: ''
  };

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteFiltro: string = '';

  maxDate: Date = new Date();

  valorFormatado: string = '0,00';

  constructor() { }

  ngOnInit(): void {
    // Simular clientes - depois troque pelo backend
    this.clientes = [
      { id: 1, nome: 'João Silva' },
      { id: 2, nome: 'Maria Oliveira' },
      { id: 3, nome: 'Carlos Souza' },
      { id: 4, nome: 'Ana Pereira' }
    ];
    this.clientesFiltrados = this.clientes;
  }

  // Compara cliente para seleção
  compareClientes(c1: Cliente, c2: Cliente): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  // Filtra clientes pelo filtro do input
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

  // Evento aberto do select para limpar filtro
  onClienteSelectOpened(opened: boolean): void {
    if (opened) {
      this.clienteFiltro = '';
      this.filtrarClientes();
    }
  }

  // Formata valor para moeda BRL simples
  onValorInput(event: any): void {
    let valor = event.target.value;

    // Remove tudo que não for número ou vírgula
    valor = valor.replace(/[^\d,]/g, '');

    // Substitui vírgulas por ponto para parseFloat
    let valorNumber = parseFloat(valor.replace(',', '.'));

    if (isNaN(valorNumber)) {
      this.valorFormatado = '0,00';
      this.venda.valorTotal = 0;
      return;
    }

    this.venda.valorTotal = valorNumber;

    // Formata para "0,00"
    this.valorFormatado = valorNumber.toFixed(2).replace('.', ',');
  }

  salvarVenda(): void {
    if (!this.venda.clienteId || !this.venda.dataVenda || !this.venda.tipoPagamento || !this.venda.status) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui você faria a chamada para salvar no backend
    console.log('Venda salva:', this.venda);

    alert('Venda salva com sucesso!');

    this.limpar();
  }

  cancel(): void {
    // Lógica para cancelar ou voltar para a listagem
    console.log('Cancelado');
    // Exemplo: this.router.navigate(['/vendas']);
  }

  limpar(): void {
    this.venda = {
      clienteId: null,
      dataVenda: null,
      tipoPagamento: '',
      valorTotal: 0,
      status: '',
      observacao: ''
    };
    this.valorFormatado = '0,00';
  }
}
