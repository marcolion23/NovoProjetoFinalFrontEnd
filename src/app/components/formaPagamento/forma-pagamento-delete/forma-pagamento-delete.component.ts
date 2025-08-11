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
    const id = this.route.snapshot.paramMap.get('fpgId');
    if (id) {
      this.formaPagamentoService.readById(+id).subscribe({
        next: (res: FormaPagamento) => {
          this.item = res;
          console.log('Item para exclusão:', res);
        },
        error: (err: any) => {
          console.error('Erro ao carregar forma de pagamento:', err);
          this.formaPagamentoService.showMessage('Erro ao carregar forma de pagamento!');
          this.router.navigate(['/fpagamentos']);
        }
      });
    }
  }

  excluir(): void {
    if (this.item.fpgId) {
      this.formaPagamentoService.delete(this.item.fpgId).subscribe({
        next: () => {
          this.formaPagamentoService.showMessage('Forma de pagamento excluída com sucesso!');
          this.router.navigate(['/fpagamentos']);
        },
        error: (err: any) => {
          console.error('Erro ao excluir forma de pagamento:', err);
          this.formaPagamentoService.showMessage('Erro ao excluir forma de pagamento!');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/fpagamentos']);
  }
}
