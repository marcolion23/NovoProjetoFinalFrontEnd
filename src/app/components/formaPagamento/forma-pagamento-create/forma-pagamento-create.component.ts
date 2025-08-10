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

  // Texto exibido no input de porcentagem com %
  porcentagemText: string = '';

  // Flags para exibição de erros no formulário
  exibirErroPorcentagem: boolean = false;
  exibirErroObrigatorio: boolean = false;
  exibirErroZero: boolean = false;
  parcelasInvalida: boolean = false;

  formaPagamento: FormaPagamento = {
    fpgId: undefined,
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
      this.porcentagemText = '';
      this.exibirErroPorcentagem = false;
      this.exibirErroZero = false;
    }
  }

  bloquearTeclasInvalidas(event: KeyboardEvent) {
    if (['-', '+', 'e', ',', '.'].includes(event.key)) {
      event.preventDefault();
    }
  }

  // Método para salvar (chamado pelo botão)
  salvar(): void {
    this.createFormaPagamento();
  }

  createFormaPagamento(): void {
    this.validarParcelas();

    // Validação tipo pagamento obrigatório
    if (!this.formaPagamento.fpgTipo) {
      this.formaPagamentoService.showMessage('O tipo de pagamento é obrigatório!');
      return;
    }

    // Validação parcelas se cartão e parcelado
    if (
      this.formaPagamento.fpgTipo === 'Cartão de Crédito' &&
      this.formaPagamento.fpgNumMaxParcelas === 'sim' &&
      this.parcelasInvalida
    ) {
      this.formaPagamentoService.showMessage('Número de parcelas inválido! Deve ser entre 1 e 24.');
      return;
    }

    // Validação taxa adicional e porcentagem
    if (this.formaPagamento.fpgTaxaAdicional === 'sim') {
      const valor = parseInt(this.porcentagemText.replace('%', '').trim(), 10);

      if (!valor || valor <= 0 || valor > 100) {
        this.formaPagamentoService.showMessage('Porcentagem da taxa inválida! Deve ser entre 1% e 100%.');
        return;
      }
      // Coloca a porcentagem formatada na descrição para enviar
      this.formaPagamento.fpgDescricao = `${valor}%`;
    } else {
      this.formaPagamento.fpgDescricao = '';
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
    this.exibirErroPorcentagem = false;
    this.exibirErroObrigatorio = false;
    this.exibirErroZero = false;
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
    let valor = input.value.replace('%', '').replace(/[^\d]/g, '');

    if (valor.length > 3) {
      valor = valor.slice(0, 3);
    }

    const numero = parseInt(valor, 10);

    if (valor) {
      if (numero > 100) {
        this.exibirErroPorcentagem = true;
        this.exibirErroZero = false;
        this.porcentagemText = '100%';
      } else if (numero === 0) {
        this.exibirErroZero = true;
        this.exibirErroPorcentagem = false;
        this.porcentagemText = '0%';
      } else {
        this.exibirErroPorcentagem = false;
        this.exibirErroZero = false;
        this.porcentagemText = `${numero}%`;
      }
    } else {
      this.exibirErroPorcentagem = false;
      this.exibirErroZero = false;
      this.porcentagemText = '';
    }
  }
}
