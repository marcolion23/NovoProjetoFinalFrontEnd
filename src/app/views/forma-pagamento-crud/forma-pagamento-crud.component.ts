import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forma-pagamento-crud',
  templateUrl: './forma-pagamento-crud.component.html',
  styleUrls: ['./forma-pagamento-crud.component.css']
})
export class FormaPagamentoCrudComponent implements OnInit {

   //construtor para configurar botao para tela de produto
    constructor(private router: Router) { }
  
    ngOnInit(): void {
    }
  
    //criando interação com botoes
    navigateToFormaPagamentoCreate(): void{
      this.router.navigate(['/fpagamentos/create'])
    }

}
