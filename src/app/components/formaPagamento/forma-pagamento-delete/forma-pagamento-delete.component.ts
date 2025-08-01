import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { FormaPagamento } from '../forma-pagamento.model';

@Component({
  selector: 'app-forma-pagamento-delete',
  templateUrl: './forma-pagamento-delete.component.html',
  styleUrls: ['./forma-pagamento-delete.component.css']
})
export class FormaPagamentoDeleteComponent implements OnInit {
  item: FormaPagamento = {} as FormaPagamento;

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formaPagamentoService.readById(+id).subscribe({
        next: (res: FormaPagamento) => this.item = res,
        error: (err: any) => {
          console.error('Erro ao carregar forma de pagamento:', err);
          this.router.navigate(['/forma-pagamento']);
        }
      });
    }
  }

  excluir(): void {
    if (this.item.fpgId) {
      this.formaPagamentoService.delete(this.item.fpgId).subscribe({
        next: () => this.router.navigate(['/forma-pagamento']),
        error: (err: any) => console.error('Erro ao excluir forma de pagamento:', err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/forma-pagamento']);
  }
}
