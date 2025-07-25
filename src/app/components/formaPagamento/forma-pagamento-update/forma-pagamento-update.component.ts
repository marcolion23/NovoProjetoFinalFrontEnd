import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

  formaPagamento: FormaPagamento = {
    fpgId: 0,
    fpgDescricao: ''
    // inicialize outros campos se quiser aqui, não obrigatórios
  };

  listaPagamentos: FormaPagamento[] = [];

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const fpgIdParam = this.route.snapshot.paramMap.get('fpgId');
    if (fpgIdParam) {
      const fpgId = +fpgIdParam;
      this.formaPagamentoService.readById(fpgId).subscribe({
        next: (fp) => this.formaPagamento = fp,
        error: () => this.router.navigate(['/fpagamentos'])
      });
    } else {
      this.router.navigate(['/fpagamentos']);
    }

    // Carrega todos os pagamentos para a tabela
    this.formaPagamentoService.read().subscribe({
      next: (lista) => this.listaPagamentos = lista,
      error: (err) => console.error('Erro ao carregar lista de pagamentos:', err)
    });
  }

  updateFormaPagamento(): void {
    if (!this.formaPagamento.fpgId) {
      console.error('ID inválido para atualização');
      return;
    }

    this.formaPagamentoService.update(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento atualizada com sucesso!');
        this.router.navigate(['/fpagamentos']);
      },
      error: (err) => {
        console.error('Erro ao atualizar forma de pagamento:', err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  editarPagamento(fpgId?: number): void {
    if (fpgId !== undefined) {
      this.router.navigate(['/fpagamentos/update', fpgId]);
    }
  }

  removerPagamento(fpgId?: number): void {
    if (fpgId !== undefined) {
      if (confirm('Tem certeza que deseja remover esta forma de pagamento?')) {
        this.formaPagamentoService.delete(fpgId).subscribe(() => {
          this.formaPagamentoService.showMessage('Forma de pagamento removida com sucesso!');
          // Atualiza a lista local removendo o excluído
          this.listaPagamentos = this.listaPagamentos.filter(p => p.fpgId !== fpgId);
        });
      }
    }
  }
}
