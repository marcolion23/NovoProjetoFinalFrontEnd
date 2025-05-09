import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const cliId = this.route.snapshot.paramMap.get('cliId');
    this.clienteService.readById(cliId!).subscribe(cliente =>{
      this.cliente = cliente
    })
  }

  deleteCliente(): void {
    this.clienteService.delete(this.cliente.cliId!).subscribe(() =>{
    this.clienteService.showMessage('Cliente excluido com sucesso!')  
    this.router.navigate(['/clientes'])
    })
  }

  cancel(): void{
    this.router.navigate(['/clientes'])
  }

}
