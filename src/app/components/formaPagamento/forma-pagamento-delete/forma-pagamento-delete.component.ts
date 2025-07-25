import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-delete',
  templateUrl: './forma-pagamento-delete.component.html',
  styleUrls: ['./forma-pagamento-delete.component.css']
})
export class FormaPagamentoDeleteComponent implements OnInit {

  formaPagamento!: FormaPagamento;

  constructor(
    private formaPagamentoService: FormaPagamentoService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const proIdStr = this.route.snapshot.paramMap.get('fpgId');
    if (proIdStr) {
      const proId = Number(proIdStr);
      this.formaPagamentoService.readById(proId).subscribe(formaPagamento => {
        this.formaPagamento = formaPagamento;
      });
    }
  }

  deleteFormaPagamento(): void {
    if (this.formaPagamento.fpgId) {
      this.formaPagamentoService.delete(this.formaPagamento.fpgId).subscribe(() => {
        this.formaPagamentoService.showMessage('Forma de pagamento excluída com sucesso!');
        this.router.navigate(['/fpagamentos']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

}
