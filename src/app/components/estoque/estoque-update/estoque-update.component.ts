import { Component, OnInit } from '@angular/core';

// Interface que define a estrutura de um item do estoque
interface EstoqueItem {
  produto: string;
  categoria: string;
  quantidade: number;
  precoUnitario: number;
  ultimaEntrada: Date;
}

@Component({
  selector: 'app-estoque-update',
  templateUrl: './estoque-update.component.html',
  styleUrls: ['./estoque-update.component.css']
})
export class EstoqueUpdateComponent implements OnInit {

  // Colunas a serem exibidas na tabela (devem bater com os defs do HTML)
  displayedColumnsEstoque: string[] = [
    'produto',
    'categoria',
    'quantidade',
    'precoUnitario',
    'ultimaEntrada',
    'action'
  ];

  // Lista de produtos no estoque (dados de exemplo)
  estoque: EstoqueItem[] = [
    {
      produto: 'Mouse Gamer RGB',
      categoria: 'Acessórios',
      quantidade: 25,
      precoUnitario: 159.90,
      ultimaEntrada: new Date('2025-07-10')
    },
    {
      produto: 'Teclado Mecânico Pro',
      categoria: 'Periféricos',
      quantidade: 15,
      precoUnitario: 349.99,
      ultimaEntrada: new Date('2025-07-12')
    },
    {
      produto: 'Monitor 144Hz 24"',
      categoria: 'Monitores',
      quantidade: 7,
      precoUnitario: 1199.00,
      ultimaEntrada: new Date('2025-07-15')
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Lógica que será executada ao iniciar o componente (caso necessário)
  }

  // Método para editar um item do estoque
  editarItem(item: EstoqueItem): void {
    console.log('Editando item:', item);
    // Aqui você pode redirecionar para a tela de edição ou abrir um modal
  }

  // Método para remover um item do estoque
  removerItem(item: EstoqueItem): void {
    const confirmacao = confirm(`Deseja remover o produto "${item.produto}" do estoque?`);
    if (confirmacao) {
      this.estoque = this.estoque.filter(e => e !== item);
      console.log('Item removido:', item);
    }
  }

}
