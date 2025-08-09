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
    'clienteId',
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
    // Para testar com dados mockados:
    this.mockPagamentos();

    // Para usar dados reais da API, comente a linha acima e descomente abaixo:
    // this.loadPagamentos();
  }

  // Dados mockados respeitando seu modelo
  mockPagamentos(): void {
    this.fpagamentos = [
      {
        fpgId: 11,
        fpgDescricao: 'Cartão de Crédito',
        fpgTipo: 'Cartão',
      },
      {

        fpgId: 102,
        fpgDescricao: 'Boleto Bancário',
        fpgTipo: 'Boleto',
      },
      {
        fpgId: 103,
        fpgDescricao: 'PIX',
        fpgTipo: 'PIX',
       
      }
    ];
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
          this.loadPagamentos();
        },
        error: () => {
          this.formaPagamentoService.showMessage('Erro ao remover pagamento!');
        }
      });
    }
  }

  // Método auxiliar para mostrar nome do cliente pelo clienteId (mock)
getNomeCliente(clienteId?: number): string {
  const clientesMock: { [key: string]: string } = {
    '101': 'João Silva',
    '102': 'Maria Souza',
    '103': 'Carlos Pereira'
  };
  return clienteId ? clientesMock[clienteId.toString()] || 'Cliente Desconhecido' : '-';
}

}
