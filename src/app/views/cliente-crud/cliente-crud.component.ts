import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone?: string;
  status: boolean;
}

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {

  // Lista total de clientes simulada
  clientes: Cliente[] = [
    { id: 1, nome: 'João da Silva', cpf: '123.456.789-00', email: 'joao@email.com', telefone: '(11) 99999-9999', status: true },
    { id: 2, nome: 'Maria Oliveira', cpf: '987.654.321-00', email: 'maria@email.com', telefone: '(21) 98888-8888', status: false },
    { id: 3, nome: 'Carlos Pereira', cpf: '111.222.333-44', email: 'carlos@email.com', status: true },
    { id: 4, nome: 'Ana Souza', cpf: '555.666.777-88', email: 'ana@email.com', telefone: '(31) 97777-7777', status: true },
    { id: 5, nome: 'Pedro Gomes', cpf: '999.888.777-66', email: 'pedro@email.com', status: false },
    { id: 6, nome: 'Fernanda Lima', cpf: '444.555.666-77', email: 'fernanda@email.com', telefone: '(41) 96666-6666', status: true },
    // mais clientes podem ser adicionados
  ];

  // Controle da busca
  filterValue: string = '';

  // Clientes filtrados e paginados que aparecem na tela
  filteredClientes: Cliente[] = [];

  // Controle de paginação simples
  pageSize = 4;   // quantos cards por página
  pageIndex = 0;  // página atual (0 = primeira)
  totalPages = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.applyFilter(); // inicializa lista filtrada e paginada
  }

  /**
   * Filtra clientes pelo termo da busca (nome, cpf, email)
   * e aplica paginação.
   */
  applyFilter(event?: Event): void {
    if (event) {
      this.filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.pageIndex = 0; // resetar paginação quando filtrar
    }

    const filtro = this.filterValue;

    // Filtra clientes pelo nome, cpf ou email
    const clientesFiltrados = this.clientes.filter(c => {
      return (
        c.nome.toLowerCase().includes(filtro) ||
        c.cpf.toLowerCase().includes(filtro) ||
        c.email.toLowerCase().includes(filtro)
      );
    });

    // Atualiza o total de páginas conforme filtro
    this.totalPages = Math.ceil(clientesFiltrados.length / this.pageSize);

    // Aplica paginação no resultado filtrado
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredClientes = clientesFiltrados.slice(start, end);
  }

  /**
   * Limpa o filtro e atualiza a lista.
   */
  clearFilter(): void {
    this.filterValue = '';
    this.applyFilter();
  }

  /**
   * Navega para o formulário de edição do cliente
   * na rota '/clientes/edit/:id'
   */
  onEditar(cliente: Cliente): void {
    this.router.navigate(['/clientes/edit', cliente.id]);
  }

  /**
   * Remove cliente da lista com confirmação.
   * Atualiza a lista filtrada e paginada.
   */
  onExcluir(cliente: Cliente): void {
    if (confirm(`Deseja realmente excluir o cliente "${cliente.nome}"?`)) {
      // Remove cliente da lista original
      this.clientes = this.clientes.filter(c => c.id !== cliente.id);

      // Reaplica filtro e paginação para atualizar a tela
      this.applyFilter();
      
      // Ajusta pageIndex caso fique fora do totalPages
      if(this.pageIndex >= this.totalPages && this.pageIndex > 0) {
        this.pageIndex--;
        this.applyFilter();
      }
    }
  }

  /**
   * Vai para página anterior, se existir.
   */
  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.applyFilter();
    }
  }

  /**
   * Vai para próxima página, se existir.
   */
  nextPage(): void {
    if (this.pageIndex < this.totalPages -1) {
      this.pageIndex++;
      this.applyFilter();
    }
  }

}
