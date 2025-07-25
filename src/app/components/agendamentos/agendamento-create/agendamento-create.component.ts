import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Agendamento {
  cliente: string;
  data: Date | null;
  hora: string;
  servico: string;
  status: string;
  observacoes: string;
}

@Component({
  selector: 'app-agendamento-create',
  templateUrl: './agendamento-create.component.html',
  styleUrls: ['./agendamento-create.component.css']
})
export class AgendamentoCreateComponent implements OnInit {

  agendamento: Agendamento = {
    cliente: '',
    data: null,
    hora: '',
    servico: '',
    status: '',
    observacoes: ''
  };

  constructor(private router: Router) { }
  maxDate: Date = new Date();  // Limita a data a hoje

  ngOnInit(): void {}

  salvar(): void {
    if (!this.agendamento.cliente || !this.agendamento.data || !this.agendamento.hora || !this.agendamento.servico || !this.agendamento.status) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    // Aqui você faria a chamada ao backend para salvar o agendamento
    console.log('Agendamento salvo:', this.agendamento);

    alert('Agendamento salvo com sucesso!');
    this.router.navigate(['/agendamentos']); // exemplo: volta para lista de agendamentos
  }

  cancelar(): void {
    // Voltar para a lista sem salvar
    this.router.navigate(['/agendamentos']);
  }

  limpar(): void {
    this.agendamento = {
      cliente: '',
      data: null,
      hora: '',
      servico: '',
      status: '',
      observacoes: ''
    };
  }

}
