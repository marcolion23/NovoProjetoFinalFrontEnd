import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent implements OnInit {

  formaPagamento: FormaPagamento = {
    fpgDescricao: '',
    clienteId: undefined,
    tipo: '',
    valor: undefined,
    data: undefined,
    parcelas: undefined, // undefined inicialmente
    status: '',
    observacao: ''
  };

  valorFormatado: string = '';

  maxDate: Date = new Date();

  clientes = [
    { id: 1, nome: 'Cliente A' },
    { id: 2, nome: 'Cliente B' },
    { id: 3, nome: 'Cliente C' }
  ];

  clientesFiltrados = [...this.clientes];
  clienteFiltro: string = '';

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Carregar clientes via serviço se necessário
  }

  filtrarClientes() {
    const filtro = this.clienteFiltro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.nome.toLowerCase().includes(filtro)
    );
  }

  onClienteSelectOpened(opened: boolean) {
    if (opened) {
      this.clienteFiltro = '';
      this.clientesFiltrados = [...this.clientes];
    }
  }

  compareClientes(c1: any, c2: any): boolean {
    return c1 === c2;
  }

  onTipoPagamentoChange(tipo: string) {
    this.formaPagamento.tipo = tipo?.trim();

    if (this.formaPagamento.tipo === 'Cartão de Crédito') {
      // Só inicializa parcelas se for crédito e valor inválido
      if (this.formaPagamento.parcelas === undefined || this.formaPagamento.parcelas < 0) {
        this.formaPagamento.parcelas = 1;
      }
    } else {
      // Remove parcelas para qualquer outro tipo, inclusive débito
      this.formaPagamento.parcelas = undefined;
    }
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    // Bloquear hífen e sinais de menos para o campo parcelas
    if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === ',' || event.key === '.') {
      event.preventDefault();
    }
  }

  createFormaPagamento(): void {
    this.formaPagamentoService.create(this.formaPagamento).subscribe(() => {
      this.formaPagamentoService.showMessage('Pagamento criado!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  limpar(): void {
    this.formaPagamento = {
      fpgDescricao: '',
      clienteId: undefined,
      tipo: '',
      valor: undefined,
      data: undefined,
      parcelas: undefined,
      status: '',
      observacao: ''
    };
    this.valorFormatado = '';
  }

  onValorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    valor = valor.replace(/\D/g, '');
    let valorNumerico = parseInt(valor, 10);

    if (isNaN(valorNumerico)) {
      this.valorFormatado = '';
      this.formaPagamento.valor = undefined;
      return;
    }

    valorNumerico = valorNumerico / 100;

    this.valorFormatado = valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });

    this.formaPagamento.valor = valorNumerico;
  }
}
