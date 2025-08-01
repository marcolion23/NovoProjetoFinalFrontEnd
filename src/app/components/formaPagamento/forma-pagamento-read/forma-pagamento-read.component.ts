import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormaPagamento } from '../forma-pagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';

@Component({
  selector: 'app-forma-pagamento-read',
  templateUrl: './forma-pagamento-read.component.html',
  styleUrls: ['./forma-pagamento-read.component.css']
})
export class FormaPagamentoReadComponent implements OnInit {

  displayedColumns: string[] = [
    'fpgId',
    'clienteNome',
    'valor',
    'data',
    'fpgDescricao',
    'status',
    'acoes'
  ];

fpagamentos: FormaPagamento[] = [];

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPagamentos();
  }

  loadPagamentos(): void {
    this.formaPagamentoService.read().subscribe({
      next: (dados) => {
        this.fpagamentos = dados;
      },
      error: () => {
this.formaPagamentoService.showMessage('Erro ao carregar pagamentos!');
      }
    });
  }

  editarPagamento(id: number): void {
    this.router.navigate(['/fpagamentos/update', id]);
  }

  removerPagamento(id: number): void {
    if (confirm('Tem certeza que deseja remover essa forma de pagamento?')) {
      this.formaPagamentoService.delete(id).subscribe({
        next: () => {
          this.formaPagamentoService.showMessage('Removido com sucesso!');
          this.loadPagamentos(); // Atualiza lista após exclusão
        },
        error: () => {
this.formaPagamentoService.showMessage('Erro ao remover pagamento!');
        }
      });
    }
  }
}
