import { Component, OnInit } from '@angular/core';

// Interface que representa um Cliente
interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  status: boolean; // true = ativo, false = inativo
}

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {

  // Lista completa de clientes (pode vir do backend futuramente)
  clientes: Cliente[] = [];

  // Lista filtrada para exibição na tabela (de acordo com a busca)
  clientesFiltrados: Cliente[] = [];

  // Filtro de busca (string para filtrar clientes pelo nome, cpf, email etc)
  filtroBusca: string = '';

  // Propriedades para os painéis de resumo
  totalClientes: number = 0;
  clientesInativos: number = 0;
  ultimaAtualizacaoClientes: string = '';

  constructor() {}

  ngOnInit(): void {
    // Inicializa os dados (exemplo estático, substitua com dados do backend)
    this.clientes = [
      { id: 1, nome: 'Marco Antonio', cpf: '123.456.789-00', email: 'marco@email.com', telefone: '11999999999', status: true },
      { id: 2, nome: 'Ana Silva', cpf: '987.654.321-00', email: 'ana@email.com', telefone: '11988888888', status: false }
      // Adicione mais clientes reais aqui
    ];

    // Inicializa o filtro e lista filtrada
    this.clientesFiltrados = [...this.clientes];

    // Calcula os totais para os painéis
    this.atualizarTotais();

    // Data da última atualização (exemplo)
    this.ultimaAtualizacaoClientes = new Date().toLocaleDateString();
  }

  // Atualiza os totais e quantidade de clientes inativos
  atualizarTotais() {
    this.totalClientes = this.clientes.length;
    this.clientesInativos = this.clientes.filter(c => !c.status).length;
  }

  // Método chamado ao digitar no filtro de busca para filtrar a lista
  filtrarClientes() {
    const filtro = this.filtroBusca.toLowerCase().trim();

    if (filtro === '') {
      this.clientesFiltrados = [...this.clientes];
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(filtro) ||
        cliente.cpf.includes(filtro) ||
        cliente.email.toLowerCase().includes(filtro) ||
        (cliente.telefone && cliente.telefone.includes(filtro))
      );
    }
  }

  // Abre o formulário para criar um novo cliente (implemente o modal ou navegação)
  abrirFormularioNovoCliente() {
    alert('Abrir formulário para adicionar novo cliente - implementar');
  }

  // Exporta os clientes (exemplo: exportar para CSV ou Excel)
  exportarClientes() {
    alert('Exportar lista de clientes - implementar');
  }

  // Edita um cliente pelo id (abre formulário para edição)
  editarCliente(id: number) {
    alert(`Editar cliente com id ${id} - implementar`);
  }

  // Remove um cliente pelo id (confirmação e remoção)
  removerCliente(id: number) {
    const confirmacao = confirm('Tem certeza que deseja remover este cliente?');
    if (confirmacao) {
      this.clientes = this.clientes.filter(c => c.id !== id);
      this.filtrarClientes(); // Atualiza a lista filtrada
      this.atualizarTotais();
    }
  }
}
