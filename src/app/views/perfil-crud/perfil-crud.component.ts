
// perfil-crud.component.t
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Perfil {
  id: number;
  nome: string;
  descricao: string;
  status: 'Ativo' | 'Inativo';
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-crud.component.html',
  styleUrls: ['./perfil-crud.component.css']
})
export class PerfilCrudComponent implements OnInit {

  listaPerfis: Perfil[] = [];
  totalPerfis = 0;
  perfisAtivos = 0;
  perfisInativos = 0;

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'status', 'acoes'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Mock de perfis
    this.listaPerfis = [
      { id: 1, nome: 'Administrador', descricao: 'Acesso total ao sistema', status: 'Ativo' },
      { id: 2, nome: 'Usuário Comum', descricao: 'Acesso limitado', status: 'Ativo' },
      { id: 3, nome: 'Visitante', descricao: 'Acesso restrito', status: 'Inativo' }
    ];

    this.atualizarDashboard();
  }

  atualizarDashboard(): void {
    this.totalPerfis = this.listaPerfis.length;
    this.perfisAtivos = this.listaPerfis.filter(p => p.status === 'Ativo').length;
    this.perfisInativos = this.listaPerfis.filter(p => p.status === 'Inativo').length;
  }

  editarPerfil(id: number): void {
    this.router.navigate(['/perfil/update', id]);
  }

  removerPerfil(id: number): void {
    if (confirm('Deseja realmente remover este perfil?')) {
      this.listaPerfis = this.listaPerfis.filter(p => p.id !== id);
      this.atualizarDashboard();
    }
  }
}
