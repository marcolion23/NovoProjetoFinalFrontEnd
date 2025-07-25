import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cliId = this.route.snapshot.paramMap.get('cliId');
    if (cliId) {
      this.clienteService.readById(cliId).subscribe((cliente: Cliente) => {
        this.cliente = cliente;
      });
    } else {
      // Se não tiver cliId, redireciona ou tratar erro
      this.router.navigate(['/clientes']);
    }
  }

  // Método com nome igual ao usado no HTML: atualizarCliente()
  atualizarCliente(): void {
    this.clienteService.update(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente atualizado com sucesso!');
      this.router.navigate(['/clientes']);
    });
  }

  // Método para cancelar edição
  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
  updateCliente(): void {
    // código
  }
  
  cancel(): void {
    // código
  }  
}
