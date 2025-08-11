import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

  formaPagamento: FormaPagamento = {
    fpgId: undefined,
    fpgTipo: 'Credito', // Valor padrão
    fpgDescricao: 'Pagamento via cartão de crédito', // Valor padrão
    fpgPermiteParcelamento: 'S', // Valor padrão
    fpgNumMaxParcelas: 6, // Valor padrão
    fpgTaxaAdicional: 2.50 // Valor padrão
  };

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('fpgId');
    if (id) {
      this.formaPagamentoService.readById(+id).subscribe({
        next: (data) => {
          this.formaPagamento = data;
          console.log('Dados carregados para edição:', data);
        },
        error: (err) => {
          console.error('Erro ao carregar:', err);
          this.formaPagamentoService.showMessage('Erro ao carregar forma de pagamento!');
          this.router.navigate(['/fpagamentos']);
        }
      });
    }
  }

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

    if (!this.formaPagamento.fpgId) {
      this.formaPagamentoService.showMessage('ID da forma de pagamento não encontrado!');
      return;
    }

    console.log('Payload a ser enviado:', this.formaPagamento);

    this.formaPagamentoService.update(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento atualizada com sucesso!');
        this.router.navigate(['/fpagamentos']);
      },
      error: (err) => {
        console.error('Erro ao atualizar:', err);
        this.formaPagamentoService.showMessage('Erro ao atualizar forma de pagamento!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  limpar(): void {
    // Recarrega os dados originais
    const id = this.route.snapshot.paramMap.get('fpgId');
    if (id) {
      this.formaPagamentoService.readById(+id).subscribe({
        next: (data) => {
          this.formaPagamento = data;
        }
      });
    }
  }

  onTipoChange(): void {
    // Se não for crédito, não permite parcelamento mas mantém os valores
    if (this.formaPagamento.fpgTipo !== 'Credito') {
      this.formaPagamento.fpgPermiteParcelamento = 'N';
      // Não limpa os outros campos para não interferir na validação
    } else {
      // Se for crédito, volta aos valores padrão se não estiverem definidos
      if (!this.formaPagamento.fpgPermiteParcelamento || this.formaPagamento.fpgPermiteParcelamento === 'N') {
        this.formaPagamento.fpgPermiteParcelamento = 'S';
      }
      if (!this.formaPagamento.fpgNumMaxParcelas) {
        this.formaPagamento.fpgNumMaxParcelas = 6;
      }
      if (!this.formaPagamento.fpgTaxaAdicional) {
        this.formaPagamento.fpgTaxaAdicional = 2.50;
      }
    }
  }

  onParcelamentoChange(): void {
    // Se não permite parcelamento, limpa o número de parcelas
    if (this.formaPagamento.fpgPermiteParcelamento === 'N') {
      this.formaPagamento.fpgNumMaxParcelas = undefined;
    } else {
      // Se permite parcelamento, volta ao valor padrão se não estiver definido
      if (!this.formaPagamento.fpgNumMaxParcelas) {
        this.formaPagamento.fpgNumMaxParcelas = 6;
      }
    }
  }
}
