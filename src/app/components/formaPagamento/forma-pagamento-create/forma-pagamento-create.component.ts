import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../forma-pagamento.model';
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
    parcelas: undefined,
    status: '',
    observacao: '',
    parcelado: 'nao',
    aplicarTaxas: 'nao',
    porcentagemTaxa: undefined,
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
      if (this.formaPagamento.parcelas === undefined || this.formaPagamento.parcelas < 1) {
        this.formaPagamento.parcelas = 1;
      }
      // Resetar parcelado e aplicarTaxas para valores padrão
      if (!this.formaPagamento.parcelado) {
        this.formaPagamento.parcelado = 'nao';
      }
      if (!this.formaPagamento.aplicarTaxas) {
        this.formaPagamento.aplicarTaxas = 'nao';
      }
    } else {
      this.formaPagamento.parcelas = undefined;
      this.formaPagamento.parcelado = 'nao';
      this.formaPagamento.aplicarTaxas = 'nao';
      this.formaPagamento.porcentagemTaxa = undefined;
    }
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === ',' || event.key === '.') {
      event.preventDefault();
    }
  }

  createFormaPagamento(): void {
    // Se quiser converter parcelado e aplicarTaxas para booleanos:
    /*
    const payload = {
      ...this.formaPagamento,
      parcelado: this.formaPagamento.parcelado === 'sim',
      aplicarTaxas: this.formaPagamento.aplicarTaxas === 'sim'
    };
    this.formaPagamentoService.create(payload).subscribe(() => { ... });
    */

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
      observacao: '',
      parcelado: 'nao',
      aplicarTaxas: 'nao',
      porcentagemTaxa: undefined
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
