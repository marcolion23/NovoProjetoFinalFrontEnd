import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css']
})
export class ClienteCrudComponent implements OnInit {

  //construtor para configurar botao para tela de produto
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //criando interação com botoes
  navigateToClienteCreate(): void{
    this.router.navigate(['/clientes/create'])
  }


}
