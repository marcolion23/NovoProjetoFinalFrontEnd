import { Component, OnInit } from '@angular/core';

interface Pagamento {
  id: number;
  nome: string;
  tipo: string;       // Ex: Pix, Boleto, Cartão
  status: boolean;    // true = Ativo, false = Inativo
}

@Component({
  selector: 'app-forma-pagamento-crud',
  templateUrl: './forma-pagamento-crud.component.html',
})
export class FormaPagamentoCrudComponent implements OnInit {
  listaPagamentos: Pagamento[] = [];
  totalPagamentos: number = 0;
  ultimaAtualizacao: string = '';

  ngOnInit(): void {
    // Simulação (depois substituir pelo backend)
    this.listaPagamentos = [
      { id: 1, nome: 'Cartão de Crédito', tipo: 'Cartão', status: true },
      { id: 2, nome: 'Pix Empresa', tipo: 'Pix', status: true },
      { id: 3, nome: 'Boleto Bancário', tipo: 'Boleto', status: false },
    ];
    this.totalPagamentos = this.listaPagamentos.length;
    this.ultimaAtualizacao = '17/07/2025 13:42'; // Substituir por data real
  }

  editarPagamento(id: number): void {
    // Navegar para página de edição
    console.log('Editar pagamento ID:', id);
  }

  removerPagamento(id: number): void {
    // Confirmar e remover item (depois backend)
    const confirmado = confirm('Deseja realmente remover este pagamento?');
    if (confirmado) {
      this.listaPagamentos = this.listaPagamentos.filter(p => p.id !== id);
      this.totalPagamentos = this.listaPagamentos.length;
    }
  }
}
