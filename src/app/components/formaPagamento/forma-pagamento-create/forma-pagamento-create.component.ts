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
    fpgTipo: 'Credito', // Valor padrão
    fpgDescricao: 'Pagamento via cartão de crédito', // Valor padrão
    fpgPermiteParcelamento: 'S', // Valor padrão
    fpgNumMaxParcelas: 6, // Valor padrão
    fpgTaxaAdicional: 2.50 // Valor padrão
  };

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  salvar(): void {
    // Validações básicas
    if (!this.formaPagamento.fpgTipo || !this.formaPagamento.fpgDescricao) {
      this.formaPagamentoService.showMessage('Preencha todos os campos obrigatórios!');
      return;
    }

    // Se não permite parcelamento, limpa os campos relacionados
    if (this.formaPagamento.fpgPermiteParcelamento === 'N') {
      this.formaPagamento.fpgNumMaxParcelas = undefined;
    }

    // Se não tem taxa, define como undefined
    if (!this.formaPagamento.fpgTaxaAdicional || this.formaPagamento.fpgTaxaAdicional === 0) {
      this.formaPagamento.fpgTaxaAdicional = undefined;
    }

    console.log('Payload a ser enviado:', this.formaPagamento);

    this.formaPagamentoService.create(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento criada com sucesso!');
        this.router.navigate(['/fpagamentos']);
      },
      error: (err) => {
        console.error('Erro:', err);
        this.formaPagamentoService.showMessage('Erro ao criar forma de pagamento!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  limpar(): void {
    this.formaPagamento = {
      fpgTipo: 'Credito', // Volta ao valor padrão
      fpgDescricao: 'Pagamento via cartão de crédito', // Volta ao valor padrão
      fpgPermiteParcelamento: 'S', // Volta ao valor padrão
      fpgNumMaxParcelas: 6, // Volta ao valor padrão
      fpgTaxaAdicional: 2.50 // Volta ao valor padrão
    };
  }

  onTipoChange(): void {
    // Se não for crédito, não permite parcelamento mas mantém os valores
    if (this.formaPagamento.fpgTipo !== 'Credito') {
      this.formaPagamento.fpgPermiteParcelamento = 'N';
      // Não limpa os outros campos para não interferir na validação
    } else {
      // Se for crédito, volta aos valores padrão
      this.formaPagamento.fpgPermiteParcelamento = 'S';
      this.formaPagamento.fpgNumMaxParcelas = 6;
      this.formaPagamento.fpgTaxaAdicional = 2.50;
    }
  }

  onParcelamentoChange(): void {
    // Se não permite parcelamento, limpa o número de parcelas
    if (this.formaPagamento.fpgPermiteParcelamento === 'N') {
      this.formaPagamento.fpgNumMaxParcelas = undefined;
    } else {
      // Se permite parcelamento, volta ao valor padrão
      this.formaPagamento.fpgNumMaxParcelas = 6;
    }
  }
}
