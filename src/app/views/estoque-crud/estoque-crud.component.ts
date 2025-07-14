import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import necessário

@Component({
  selector: 'app-estoque-crud',
  templateUrl: './estoque-crud.component.html',
  styleUrls: ['./estoque-crud.component.css']
})
export class EstoqueCrudComponent implements OnInit {

  // ✅ Variáveis usadas no HTML (painéis do dashboard)
  totalItens: number = 0;              // Total de itens cadastrados
  baixoEstoque: number = 0;            // Itens com estoque baixo
  ultimaAtualizacao: string = '';      // Data ou info da última atualização

  // Construtor com injeção do Router para navegação programática
  constructor(private router: Router) { }

  // Método executado ao inicializar o componente
  ngOnInit(): void {
    // Aqui depois você pode buscar os dados reais do back-end
    // Exemplo simulado para teste:
    this.totalItens = 150;
    this.baixoEstoque = 5;
    this.ultimaAtualizacao = '14/07/2025 15:30';
  }

  // Função que será chamada ao clicar no botão "Novo Item"
  navigateToestoquecreate(): void {
    this.router.navigate(['/estoque/create']);
  }

}
