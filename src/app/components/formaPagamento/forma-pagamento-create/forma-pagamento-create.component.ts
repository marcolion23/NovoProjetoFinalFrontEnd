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
    parcelas: 1,
    status: '',
    observacao: ''
  }

  valorFormatado: string = '';

  maxDate: Date = new Date(); // Para limitar data futura no datepicker

  // Exemplo fixo de clientes (substitua pelo serviço real)
  clientes = [
    { id: 1, nome: 'Cliente A' },
    { id: 2, nome: 'Cliente B' },
    { id: 3, nome: 'Cliente C' }
  ];

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Carregue clientes via serviço se quiser
  }

  createFormaPagamento(): void {
    this.formaPagamentoService.create(this.formaPagamento).subscribe(() => {
      this.formaPagamentoService.showMessage('Produto criado!');
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
      parcelas: 1,
      status: '',
      observacao: ''
    };
    this.valorFormatado = '';
  }

  onValorInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');
    let valorNumerico = parseInt(valor, 10);

    if (isNaN(valorNumerico)) {
      this.valorFormatado = '';
      this.formaPagamento.valor = undefined;
      return;
    }

    // Divide por 100 para considerar os centavos
    valorNumerico = valorNumerico / 100;

    // Formata para moeda BRL
    this.valorFormatado = valorNumerico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    });

    this.formaPagamento.valor = valorNumerico;
  }
}
