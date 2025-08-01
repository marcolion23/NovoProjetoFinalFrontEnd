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

  cliente: Cliente = {} as Cliente;

  // Propriedades para controle do endereço e CEP
  cep: string = '';
  cepInvalido: boolean = false;
  mostrarEndereco: boolean = false;
  endereco: any = {
    uf: '',
    localidade: '',
    logradouro: ''
  };
  numeroResidencia: string = '';

  maxDate: Date = new Date();  // para limitar data nascimento a hoje

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cliIdParam = this.route.snapshot.paramMap.get('cliId');
    if (cliIdParam) {
      const cliId = Number(cliIdParam);
      this.clienteService.readById(cliId).subscribe({
        next: (cliente) => this.cliente = cliente,
        error: () => this.router.navigate(['/clientes'])
      });
    } else {
      this.router.navigate(['/clientes']);
    }
  }

  atualizar(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: () => {
        this.clienteService.showMessage('Cliente atualizado com sucesso!');
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        this.clienteService.showMessage('Erro ao atualizar cliente.');
        console.error(err);
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  // Métodos "fakes" para evitar erros no template
  capitalizeFirst(campo: keyof Cliente): void {
    const valor = this.cliente[campo];
    if (typeof valor === 'string' && valor.length > 0) {
      (this.cliente as any)[campo] = valor.charAt(0).toUpperCase() + valor.slice(1);
    }
  }
  
  
  mascaraCpf(): void {
    // Pode implementar depois ou deixar vazio para não quebrar
  }

  mascaraTelefone(): void {
    // Pode implementar depois ou deixar vazio para não quebrar
  }

  onCepInput(): void {
    // Implementar busca de CEP aqui, por enquanto só simula
    if (this.cep.length === 9) {
      this.cepInvalido = false;
      this.mostrarEndereco = true;
      // Simular retorno
      this.endereco = {
        uf: 'SP',
        localidade: 'São Paulo',
        logradouro: 'Rua Exemplo'
      };
    } else {
      this.mostrarEndereco = false;
    }
  }

  apenasNumerosComMascaraCep(event: KeyboardEvent): void {
    // Permitir somente números e '-'
    const allowedChars = /[0-9\-]/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const allowedChars = /[0-9]/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  }
}
