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
    'fpgTipo',
    'fpgDescricao',
    'fpgPermiteParcelamento',
    'fpgNumMaxParcelas',
    'fpgTaxaAdicional',
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
        console.log('Formas de pagamento carregadas:', dados);
      },
      error: (err) => {
        console.error('Erro ao carregar:', err);
        this.formaPagamentoService.showMessage('Erro ao carregar formas de pagamento!');
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
          this.loadPagamentos();
        },
        error: (err) => {
          console.error('Erro ao remover:', err);
          this.formaPagamentoService.showMessage('Erro ao remover forma de pagamento!');
        }
      });
    }
  }

  criarNovaFormaPagamento(): void {
    this.router.navigate(['/fpagamentos/create']);
  }
}
