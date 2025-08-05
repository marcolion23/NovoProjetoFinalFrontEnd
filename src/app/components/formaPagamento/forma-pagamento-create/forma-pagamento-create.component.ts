import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forma-pagamento-create',
  templateUrl: './forma-pagamento-create.component.html',
  styleUrls: ['./forma-pagamento-create.component.css']
})
export class FormaPagamentoCreateComponent implements OnInit {

  parcelado: boolean = false;
  aplicarTaxas: boolean = false;
  parcelasInvalida: boolean = false;
porcentagemText: string = ''; // usado no input (com %)
exibirErroPorcentagem: boolean = false; // controle de erro 
exibirErroObrigatorio: boolean = false; // para mensagem "Porcentagem é obrigatória"
exibirErroZero: boolean = false;        // para mensagem "A porcentagem não pode ser zero"


  formaPagamento: FormaPagamento = {
    fpgDescricao: '',
    clienteId: undefined,
    tipo: '',
    valor: undefined,
    data: undefined,
    parcelas: undefined,
    status: '',
    observacao: '',
    parcelado: '',        // 'sim' | 'nao' | ''
    aplicarTaxas: '',     // 'sim' | 'nao' | ''
    porcentagemTaxa: undefined
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
  ) {}

  ngOnInit(): void {}

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
      if (!this.formaPagamento.parcelado) this.formaPagamento.parcelado = '';
      if (!this.formaPagamento.aplicarTaxas) this.formaPagamento.aplicarTaxas = '';
    } else {
      this.formaPagamento.parcelas = undefined;
      this.formaPagamento.parcelado = '';
      this.formaPagamento.aplicarTaxas = '';
      this.formaPagamento.porcentagemTaxa = undefined;
    }
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    if (['-', '+', 'e', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

  createFormaPagamento(): void {
    // Validações manuais
    this.validarParcelas();

    if (
      !this.formaPagamento.fpgDescricao ||
      !this.formaPagamento.tipo ||
      !this.formaPagamento.valor ||
      !this.formaPagamento.data ||
      !this.formaPagamento.clienteId ||
      this.parcelasInvalida
    ) {
      this.formaPagamentoService.showMessage('Preencha todos os campos obrigatórios corretamente!');
      return;
    }

    // Conversão de valores string 'sim' | 'nao' → boolean
const payload: FormaPagamento = {
  ...this.formaPagamento,
  parcelado: this.formaPagamento.parcelado === 'sim' ? 'sim' : 'nao',
  aplicarTaxas: this.formaPagamento.aplicarTaxas === 'sim' ? 'sim' : 'nao'
};

this.formaPagamentoService.create(payload).subscribe(() => {
  this.formaPagamentoService.showMessage('Pagamento criado!');
  this.router.navigate(['/fpagamentos']);
});

  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }
  salvar(): void {
  this.createFormaPagamento();
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
      parcelado: '',
      aplicarTaxas: '',
      porcentagemTaxa: undefined
    };
    this.valorFormatado = '';
    this.parcelasInvalida = false;
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

  maxParcelasValidator(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (val !== null && val > max) {
        return { maxParcelas: { max: max, actual: val } };
      }
      return null;
    };
  }

  validarParcelas(): void {
    if (
      this.formaPagamento.tipo === 'Cartão de Crédito' &&
      (!this.formaPagamento.parcelas || this.formaPagamento.parcelas < 1 || this.formaPagamento.parcelas > 24)
    ) {
      this.parcelasInvalida = true;
    } else {
      this.parcelasInvalida = false;
    }
  }

  formatarPorcentagem(): void {
    if (this.formaPagamento.porcentagemTaxa !== undefined) {
      if (this.formaPagamento.porcentagemTaxa > 100) {
        this.formaPagamento.porcentagemTaxa = 100;
      } else if (this.formaPagamento.porcentagemTaxa < 0) {
        this.formaPagamento.porcentagemTaxa = 0;
      }

      this.formaPagamento.porcentagemTaxa = parseFloat(
        this.formaPagamento.porcentagemTaxa.toFixed(2)
      );
    }
  }
onPorcentagemInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  let valor = input.value.replace('%', '').replace(/[^\d.]/g, '');

  // Limita a 3 dígitos
  if (valor.length > 3) {
    valor = valor.slice(0, 3);
  }

  const numero = parseFloat(valor);

  // Atualiza model interno
  this.formaPagamento.porcentagemTaxa = isNaN(numero) ? undefined : numero;

  // Adiciona % visualmente
  if (valor) {
    this.porcentagemText = `${valor}%`;
  } else {
    this.porcentagemText = '';
  }

  // Verifica erros
  this.exibirErroPorcentagem = numero > 100;
  this.exibirErroObrigatorio = valor.length === 0;      // campo vazio
  this.exibirErroZero = numero === 0 && valor.length > 0; // zero digitado
}



}
