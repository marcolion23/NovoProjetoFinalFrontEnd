import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstoqueService } from '../estoque.service'; // ajuste o caminho conforme sua estrutura
import { EstoqueModel } from '../estoque.model'; // corrigido para EstoqueModel

@Component({
  selector: 'app-estoque-delete',
  templateUrl: './estoque-delete.component.html',
  styleUrls: ['./estoque-delete.component.css'],
})
export class EstoqueDeleteComponent implements OnInit {
  item: EstoqueModel = {} as EstoqueModel;

  constructor(
    private estoqueService: EstoqueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.estoqueService.getEstoqueById(+id).subscribe({
        next: (res) => {
          this.item = res;
        },
        error: (err) => {
          console.error('Erro ao buscar item:', err);
          this.router.navigate(['/estoque']); // volta caso erro
        }
      });
    }
  }

  excluir(): void {
    if (this.item.proId) {
      this.estoqueService.deleteEstoque(this.item.proId).subscribe({
        next: () => {
          this.router.navigate(['/estoque']);
        },
        error: (err) => {
          console.error('Erro ao excluir item:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/estoque']);
  }

  getNomeCategoria(categoria: string): string {
    const categorias: { [key: string]: string } = {
      teclado: 'Teclado',
      mouse: 'Mouse',
      monitor: 'Monitor',
      headset: 'Headset',
      mousepad: 'MousePad',
      cadeira: 'Cadeira Gamer',
      console: 'Console',
      controle: 'Controle',
      notebook: 'Notebook Gamer',
      'placa-video': 'Placa de Vídeo',
      cpu: 'Processador (CPU)',
      ram: 'Memória RAM',
      fonte: 'Fonte',
      gabinete: 'Gabinete',
      cooler: 'Cooler / WaterCooler',
      jogos: 'Jogos',
      giftcards: 'Gift Cards',
      servicos: 'Serviços Técnicos',
      acessorios: 'Acessórios',
    };
    return categorias[categoria] || categoria;
  }
}
