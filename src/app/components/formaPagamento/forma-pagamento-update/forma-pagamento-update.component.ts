import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { Router } from '@angular/router';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

  parcelasInvalida: boolean = false;
  porcentagemText: string = '';
  exibirErroPorcentagem: boolean = false;
  exibirErroObrigatorio: boolean = false;
  exibirErroZero: boolean = false;

  formaPagamento: FormaPagamento = {
    fpgDescricao: '',
    fpgTipo: '',
    fpgPermiteParcelamento: undefined,
    fpgNumMaxParcelas: '',
    fpgTaxaAdicional: '',
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
    this.formaPagamento.fpgTipo = tipo?.trim();

    if (this.formaPagamento.fpgTipo === 'Cartão de Crédito') {
      if (!this.formaPagamento.fpgPermiteParcelamento) {
        this.formaPagamento.fpgPermiteParcelamento = 1;
      }
      if (!this.formaPagamento.fpgNumMaxParcelas) {
        this.formaPagamento.fpgNumMaxParcelas = '';
      }
      if (!this.formaPagamento.fpgTaxaAdicional) {
        this.formaPagamento.fpgTaxaAdicional = '';
      }
    } else {
      this.formaPagamento.fpgPermiteParcelamento = undefined;
      this.formaPagamento.fpgNumMaxParcelas = '';
      this.formaPagamento.fpgTaxaAdicional = '';
    }
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    if (['-', '+', 'e', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

  atualizarPagamento(): void {
    this.validarParcelas();

    if (!this.formaPagamento.fpgDescricao || !this.formaPagamento.fpgTipo || this.parcelasInvalida) {
      this.formaPagamentoService.showMessage('Preencha todos os campos obrigatórios corretamente!');
      return;
    }

    const payload: FormaPagamento = {
      ...this.formaPagamento,
      fpgNumMaxParcelas: this.formaPagamento.fpgNumMaxParcelas === 'sim' ? 'sim' : 'nao',
      fpgTaxaAdicional: this.formaPagamento.fpgTaxaAdicional === 'sim' ? 'sim' : 'nao'
    };

    this.formaPagamentoService.update(payload).subscribe(() => {
      this.formaPagamentoService.showMessage('Pagamento atualizado com sucesso!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancelarEdicao(): void {
    this.router.navigate(['/fpagamentos']);
  }

  limparFormulario(): void {
    this.formaPagamento = {
      fpgDescricao: '',
      fpgTipo: '',
      fpgNumMaxParcelas: '',
      fpgTaxaAdicional: ''
    };
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
      this.formaPagamento.fpgTipo === 'Cartão de Crédito' &&
      (!this.formaPagamento.fpgPermiteParcelamento || this.formaPagamento.fpgPermiteParcelamento < 1 || this.formaPagamento.fpgPermiteParcelamento > 24)
    ) {
      this.parcelasInvalida = true;
    } else {
      this.parcelasInvalida = false;
    }
  }

  onPorcentagemInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace('%', '').replace(/[^\d.]/g, '');

    if (valor.length > 3) {
      valor = valor.slice(0, 3);
    }

    const numero = parseFloat(valor);

    this.formaPagamento.fpgTaxaAdicional = numero > 0 ? 'sim' : 'nao';

    if (valor) {
      this.porcentagemText = `${valor}%`;
    } else {
      this.porcentagemText = '';
    }

    this.exibirErroPorcentagem = numero > 100;
    this.exibirErroObrigatorio = valor.length === 0;
    this.exibirErroZero = numero === 0 && valor.length > 0;
  }
  get parcelasInvalidas(): boolean {
  const p = this.formaPagamento?.fpgPermiteParcelamento;
  return p !== undefined && p !== null && (p < 1 || p > 24);
}

}
