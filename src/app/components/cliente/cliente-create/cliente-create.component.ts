import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente.model';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  dataNascimento = new FormControl('', [Validators.required]);

  maxDate = new Date(); // não permite data futura
  startDate = new Date(1990, 0, 1); // abre o calendário em 1990 (ano que preferir)
  // Declarando o objeto cliente com valores iniciais válidos
  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',
    cliEmail: '',
    cliTelefone: '',
    cliDataNascimento: '',  // Novo campo: Data de Nascimento
    cliRua: '',             // Novo campo: Rua
    cliNumero: null,        // Valor inicial null para número da residência (sem tipo aqui!)
    cliBairro: '',          // Novo campo: Bairro
    cliCidade: '',          // Novo campo: Cidade
    cliEstado: '',          // Novo campo: Estado
    cliCep: '',             // Novo campo: CEP
    cliAtivo: true          // Novo campo: Status do cliente (ativo/inativo)
  }

  constructor(private clienteService: ClienteService,
              private router: Router) { }
  
  ngOnInit(): void {
    // Inicialização se necessário
  }

  createCliente(): void {
    this.clienteService.create(this.cliente).subscribe(() => {
      this.clienteService.showMessage('Cliente criado!')
      this.router.navigate(['/clientes'])
    })
  }
  
  cancel(): void {
    this.router.navigate(['/clientes'])
  }

  salvar() {
    // Aqui o erro é que 'cliNumero' não é propriedade da classe
    // Se quer acessar o número, use this.cliente.cliNumero
    console.log('Número da residência:', this.cliente.cliNumero);
    // lógica para enviar os dados para o backend, etc.
  }
    
  limpar(): void {
    this.cliente = {
      cliNome: '',
      cliCpf: '',
      cliEmail: '',
      cliTelefone: '',
      cliDataNascimento: '',
      cliRua: '',
      cliNumero: null,
      cliBairro: '',
      cliCidade: '',
      cliEstado: '',
      cliCep: '',
      cliAtivo: true
    }
  }
}
