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

  porcentagemText: string = ''; // usado no input visual (%)
  exibirErroPorcentagem: boolean = false;
  exibirErroObrigatorio: boolean = false;
  exibirErroZero: boolean = false;
  parcelasInvalida: boolean = false;

  formaPagamento: FormaPagamento = {
    fpgDescricao: '',
    fpgTipo: '',
    fpgPermiteParcelamento: undefined,
    fpgNumMaxParcelas: '',
    fpgTaxaAdicional: ''
  };

  valorFormatado: string = '';

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onTipoPagamentoChange(tipo: string) {
    this.formaPagamento.fpgTipo = tipo?.trim();

    if (this.formaPagamento.fpgTipo === 'Cartão de Crédito') {
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

  createFormaPagamento(): void {
    this.validarParcelas();

    if (
      !this.formaPagamento.fpgTipo ||
      this.parcelasInvalida
    ) {
      this.formaPagamentoService.showMessage('Preencha todos os campos obrigatórios corretamente!');
      return;
    }

    const payload: FormaPagamento = { ...this.formaPagamento };

    this.formaPagamentoService.create(payload).subscribe(() => {
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
      fpgTipo: '',
      fpgPermiteParcelamento: undefined,
      fpgNumMaxParcelas: '',
      fpgTaxaAdicional: ''
    };
    this.valorFormatado = '';
    this.parcelasInvalida = false;
    this.porcentagemText = '';
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
      this.formaPagamento.fpgNumMaxParcelas === 'sim' &&
      (!this.formaPagamento.fpgPermiteParcelamento ||
        this.formaPagamento.fpgPermiteParcelamento < 1 ||
        this.formaPagamento.fpgPermiteParcelamento > 24)
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

    if (valor) {
      this.porcentagemText = `${valor}%`;
    } else {
      this.porcentagemText = '';
    }

    this.exibirErroPorcentagem = numero > 100;
    this.exibirErroObrigatorio = valor.length === 0;
    this.exibirErroZero = numero === 0 && valor.length > 0;
  }
}
