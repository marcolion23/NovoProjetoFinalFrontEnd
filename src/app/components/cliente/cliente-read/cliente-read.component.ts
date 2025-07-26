import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {

  clientes: Cliente[] = [];

  // Ajuste: As colunas precisam bater exatamente com o HTML
  displayedColumns: string[] = ['cliId', 'cliNome', 'cliEmail', 'cliTelefone', 'cliStatus', 'cliDataCadastro', 'action'];

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Dados fixos para teste com todos os campos usados na tabela
this.clientes = [
  {
    cliId: 1,
    cliNome: 'João Silva',
    cliCpf: '123.456.789-00',
    cliEmail: 'joao.silva@email.com',
    cliTelefone: '(11) 91234-5678',
    cliStatus: 'Ativo',
    cliAtivo: true,
    cliDataCadastro: '2024-01-01'
  },
  {
    cliId: 2,
    cliNome: 'Maria Oliveira',
    cliCpf: '987.654.321-99',
    cliEmail: 'maria.oliveira@email.com',
    cliTelefone: '(21) 99876-5432',
    cliStatus: 'Ativo',
    cliAtivo: false,
    cliDataCadastro: '2024-05-15'
  }
];


    // Para usar backend, comente o bloco acima e descomente a linha abaixo:
    // this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.read().subscribe({
      next: (clientes: Cliente[]) => {
        this.clientes = clientes;
      },
      error: (error) => {
        console.error('Erro ao buscar clientes:', error);
      }
    });
  }

  editarCliente(cliente: Cliente): void {
    if (cliente.cliId !== undefined) {
      this.router.navigate(['/clientes/update', cliente.cliId]);
    } else {
      console.error('Cliente sem ID válido para edição.');
    }
  }

  removerCliente(cliente: Cliente): void {
    if (cliente.cliId !== undefined) {
      this.clienteService.delete(cliente.cliId).subscribe({
        next: () => {
          this.clienteService.showMessage('Cliente removido com sucesso!');
          this.ngOnInit(); // Atualiza a lista após exclusão
        },
        error: err => {
          console.error('Erro ao remover cliente:', err);
        }
      });
    } else {
      console.error('Cliente sem ID válido para remoção.');
    }
  }
}
