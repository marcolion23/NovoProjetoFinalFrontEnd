import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css'],
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {} as Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clienteService.readById(+id).subscribe((res) => {
        this.cliente = res;
      });
    }
  }

  excluir(): void {
    if (this.cliente.cliId) {
      this.clienteService.delete(this.cliente.cliId).subscribe(() => {
        this.router.navigate(['/clientes']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
