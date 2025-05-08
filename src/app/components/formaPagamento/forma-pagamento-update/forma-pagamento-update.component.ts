import { Component, OnInit } from '@angular/core';
import { FormaPagamento } from '../formaPagamento.model';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

   formaPagamento!: FormaPagamento;
  
    constructor(private formaPagamentoService: FormaPagamentoService, 
      private router: Router, 
      private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      const fpgId = this.route.snapshot.paramMap.get('fpgId')
      this.formaPagamentoService.readById(fpgId!).subscribe((formaPagamento: FormaPagamento) =>{
        this.formaPagamento = formaPagamento
      })
    }
  
    updateFormaPagamento(): void {
      this.formaPagamentoService.update(this.formaPagamento).subscribe(() => {
        this.formaPagamentoService.showMessage('Forma de pagamento atualizada com sucesso!')
        this.router.navigate(['/fpagamentos'])
      })
    }
  
    cancel(): void {
      this.router.navigate(['/fpagamentos'])
    }
  

}
