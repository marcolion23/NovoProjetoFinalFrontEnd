import { Component, OnInit } from '@angular/core';

interface Pagamento {
  id: number;
  nome: string;
  tipo: string;
  status: boolean;   // true = Pago, false = Pendente
  valor: number;
  dataCriacao: string;
}

@Component({
  selector: 'app-forma-pagamento-crud',
  templateUrl: './forma-pagamento-crud.component.html',
  styleUrls: ['./forma-pagamento-crud.component.css']
})
export class FormaPagamentoCrudComponent implements OnInit {
  listaPagamentos: Pagamento[] = [];
  totalPagamentos = 0;
  pagamentosAtrasados = 0;
  ultimaAtualizacao = '';

  ngOnInit(): void {
    this.listaPagamentos = [
      { id: 1, nome: 'João Silva', tipo: 'Cartão', status: true, valor: 299.90, dataCriacao: '2025-07-10' },
      { id: 2, nome: 'Pix Empresa', tipo: 'Pix', status: true, valor: 199.99, dataCriacao: '2025-07-12' },
      { id: 3, nome: 'Boleto Bancário', tipo: 'Boleto', status: false, valor: 129.90, dataCriacao: '2025-07-14' },
    ];
    this.atualizarResumo();
  }

  atualizarResumo(): void {
    this.totalPagamentos = this.listaPagamentos.length;
    this.ultimaAtualizacao = new Date().toLocaleString('pt-BR');
  }

  adicionarPagamento(): void {
    const novoId = this.listaPagamentos.length + 1;
    this.listaPagamentos.push({
      id: novoId,
      nome: `Novo Cliente ${novoId}`,
      tipo: 'Pix',
      status: true,
      valor: 150.00,
      dataCriacao: new Date().toISOString().split('T')[0]
    });
    this.atualizarResumo();
  }

  editarPagamento(id: number): void {
    console.log('Editar pagamento ID:', id);
  }

  removerPagamento(id: number): void {
    if (confirm('Deseja realmente remover este pagamento?')) {
      this.listaPagamentos = this.listaPagamentos.filter(p => p.id !== id);
      this.atualizarResumo();
    }
  }
}
