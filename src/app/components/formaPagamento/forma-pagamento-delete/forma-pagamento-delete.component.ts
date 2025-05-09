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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('fpgId');
    this.formaPagamentoService.readById(proId!).subscribe(formaPagamento =>{
      this.formaPagamento = formaPagamento
    })
  }

  deleteFormaPagamento(): void {
    this.formaPagamentoService.delete(this.formaPagamento.fpgId!).subscribe(() =>{
    this.formaPagamentoService.showMessage('Produto excluido com sucesso!')  
    this.router.navigate(['/fpagamentos'])
    })
  }

  cancel(): void{
    this.router.navigate(['/fpagamentos'])
  }

}
