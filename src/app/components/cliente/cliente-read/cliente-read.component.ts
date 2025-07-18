// Importações principais do Angular
import { Component, OnInit } from '@angular/core';

// Modelo de dados do cliente (interface)
import { Cliente } from '../cliente.model';

// Serviço responsável por buscar os clientes do backend
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-read', // Nome do seletor usado no HTML
  templateUrl: './cliente-read.component.html', // Template HTML da tabela de clientes
  styleUrls: ['./cliente-read.component.css']   // Estilo visual do componente
})
export class ClienteReadComponent implements OnInit {

  // Lista de clientes que será preenchida ao carregar o componente
  clientes: Cliente[] = [];

  // Colunas visíveis na tabela HTML (devem bater com o matColumnDef do HTML)
  displayedColumns: string[] = ['cliId', 'cliNome', 'cliCpf', 'cliEmail', 'cliTelefone', 'action'];

  // Injeta o serviço de cliente para fazer requisição ao backend
  constructor(private clienteService: ClienteService) {}

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    // Chama o serviço para obter a lista de clientes e inscreve-se para receber a resposta
    this.clienteService.read().subscribe({
      next: (clientes) => {
        this.clientes = clientes; // Atribui os dados recebidos à variável local
        console.log('Clientes carregados:', clientes); // Log para depuração
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err); // Tratamento básico de erro
      }
    });
  }
}
