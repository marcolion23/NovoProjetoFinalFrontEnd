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
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

  listaAgendamentos: Agendamento[] = [];

  totalAgendamentos = 0;
  agendamentosAtrasados = 0;
  ultimaAtualizacao = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Simula carregamento dos agendamentos (substitua pela chamada ao serviço real)
    this.listaAgendamentos = [
      { id: 1, clienteNome: 'João', servico: 'Troca de placa', data: new Date('2025-07-20'), hora: '14:00', status: 'Pendente' },
      { id: 2, clienteNome: 'Maria', servico: 'Formatação', data: new Date('2025-07-19'), hora: '10:00', status: 'Concluído' },
      { id: 3, clienteNome: 'Carlos', servico: 'Upgrade RAM', data: new Date('2025-07-18'), hora: '16:00', status: 'Pendente' }
    ];

    this.atualizarDashboard();
  }

  atualizarDashboard(): void {
    this.totalAgendamentos = this.listaAgendamentos.length;
    this.agendamentosAtrasados = this.listaAgendamentos.filter(a =>
      a.status === 'Pendente' && a.data < new Date()
    ).length;
    this.ultimaAtualizacao = new Date().toLocaleString();
  }

  editarAgendamento(id: number): void {
    // Navega para a tela de edição com o ID
    this.router.navigate(['/agendamentos/edit', id]);
  }

  removerAgendamento(id: number): void {
    if (confirm('Deseja realmente remover este agendamento?')) {
      this.listaAgendamentos = this.listaAgendamentos.filter(a => a.id !== id);
      this.atualizarDashboard();
    }
  }

}
