import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaService } from '../venda.service';
import { Venda } from '../venda.model';

@Component({
  selector: 'app-venda-delete',
  templateUrl: './venda-delete.component.html',
  styleUrls: ['./venda-delete.component.css']
})
export class VendaDeleteComponent implements OnInit {
venda: Partial<Venda> = {
  id: null,
  clienteId: 0,
  clienteNome: '',
  produtoId: 0,
  produtoNome: '',
  quantidade: 0,
  valorTotal: 0,
  dataVenda: new Date(),
  tipoPagamento: ''
};


  constructor(
    private vendaService: VendaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vendaService.buscarPorId(id).subscribe((venda) => {
      this.venda = venda;
    });
  }

  excluirVenda(): void {
    this.vendaService.excluir(this.venda.id!).subscribe({
      next: () => this.router.navigate(['/vendas']),
      error: (err) => console.error('Erro ao excluir a venda:', err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/vendas']);
  }

  limpar(): void {
    this.venda = {
      id: null,
      clienteId: null,
      clienteNome: '',
      produtoId: null,
      produtoNome: '',
      quantidade: 0,
      valorTotal: 0,
      dataVenda: new Date(),  // Corrigido aqui
      tipoPagamento: ''
    };

    // Remova essas duas linhas porque não existem no componente delete:
    // this.produtoSelecionado = null;
    // this.quantidadeProduto = 1;
  }

}
