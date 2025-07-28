import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { FormaPagamento } from '../formaPagamento.model';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

  displayedColumns: string[] = [
    'fpgId',
    'clienteNome',
    'valor',
    'dataPagamento',
    'fpgDescricao',
    'status',
    'acoes'
  ];

  pagamentos = [
    {
      fpgId: 1,
      clienteNome: 'João da Silva',
      valor: 199.99,
      dataPagamento: new Date('2025-07-20'),
      fpgDescricao: 'Cartão de Crédito',
      status: 'Pago'
    },
    {
      fpgId: 2,
      clienteNome: 'Maria Oliveira',
      valor: 59.90,
      dataPagamento: new Date('2025-07-21'),
      fpgDescricao: 'Pix',
      status: 'Pendente'
    },
    {
      fpgId: 3,
      clienteNome: 'Carlos Souza',
      valor: 120.00,
      dataPagamento: new Date('2025-07-22'),
      fpgDescricao: 'Boleto Bancário',
      status: 'Cancelado'
    }
  ];

  formaPagamento!: FormaPagamento;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fpgId = this.route.snapshot.paramMap.get('fpgId');
    if (fpgId) {
      this.formaPagamentoService.readById(+fpgId).subscribe({
        next: (fp: FormaPagamento) => this.formaPagamento = fp,
        error: () => this.router.navigate(['/fpagamentos'])
      });
    }
  }

  updateFormaPagamento(): void {
    this.formaPagamentoService.update(this.formaPagamento).subscribe(() => {
      this.formaPagamentoService.showMessage('Atualizado com sucesso!');
      this.router.navigate(['/fpagamentos']);
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  editarPagamento(id: number): void {
    this.router.navigate(['/fpagamentos/update', id]);
  }

  removerPagamento(id: number): void {
    if (confirm('Deseja remover essa forma de pagamento?')) {
      this.pagamentos = this.pagamentos.filter(p => p.fpgId !== id);
      this.formaPagamentoService.showMessage('Forma de pagamento removida com sucesso!');
    }
  }
}
