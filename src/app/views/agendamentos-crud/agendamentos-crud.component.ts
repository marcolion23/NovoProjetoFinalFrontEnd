import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Agendamento {
  id: number;
  clienteNome: string;
  servico: string;
  data: Date;
  hora: string;
  status: 'Pendente' | 'Concluído';
}

@Component({
  selector: 'app-agendamento-crud',
  templateUrl: './agendamentos-crud.component.html',
  styleUrls: ['./agendamentos-crud.component.css']
})
export class AgendamentoCrudComponent implements OnInit {

  listaAgendamentos: Agendamento[] = [];

  totalAgendamentos = 0;
  agendamentosAtrasados = 0;
  agendamentosPendentes = 0;
  agendamentosConcluidos = 0;
  ultimaAtualizacao = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulação de dados, substituir por chamada real na sua API
    this.listaAgendamentos = [
      { id: 1, clienteNome: 'João', servico: 'Troca de placa', data: new Date('2025-07-20'), hora: '14:00', status: 'Pendente' },
      { id: 2, clienteNome: 'Maria', servico: 'Formatação', data: new Date('2025-07-19'), hora: '10:00', status: 'Concluído' },
      { id: 3, clienteNome: 'Carlos', servico: 'Upgrade RAM', data: new Date('2025-07-18'), hora: '16:00', status: 'Pendente' }
    ];

    this.atualizarDashboard();
  }

  atualizarDashboard(): void {
    const agora = new Date();

    this.totalAgendamentos = this.listaAgendamentos.length;

    // Considerando data e hora para atraso
    this.agendamentosAtrasados = this.listaAgendamentos.filter(a => {
      const dataHora = new Date(a.data);
      const [hora, minuto] = a.hora.split(':').map(Number);
      dataHora.setHours(hora, minuto, 0, 0);
      return a.status === 'Pendente' && dataHora < agora;
    }).length;

    this.agendamentosPendentes = this.listaAgendamentos.filter(a => a.status === 'Pendente').length;
    this.agendamentosConcluidos = this.listaAgendamentos.filter(a => a.status === 'Concluído').length;

    this.ultimaAtualizacao = agora.toLocaleString('pt-BR');
  }

  editarAgendamento(id: number): void {
    this.router.navigate(['/agendamentos/edit', id]);
  }

  removerAgendamento(id: number): void {
    if (confirm('Deseja realmente remover este agendamento?')) {
      this.listaAgendamentos = this.listaAgendamentos.filter(a => a.id !== id);
      this.atualizarDashboard();
    }
  }
}
