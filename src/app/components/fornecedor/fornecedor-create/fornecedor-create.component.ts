import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  // Aqui definimos o objeto fornecedor com os campos que o formulário usa
  fornecedor = {
    nome: '',
    cnpj: '',
    inscricaoEstadual: '',
    telefone: '',
    email: '',
    rua: '',
    numero: null,
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    contatoPrincipal: '',
    telefoneContato: '',
    observacoes: '',
    status: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  // Função para salvar o fornecedor (implemente conforme backend)
  salvar(): void {
    console.log('Salvar fornecedor:', this.fornecedor);
    // aqui você pode chamar seu serviço para salvar no backend
  }

  // Função para cancelar cadastro (exemplo: redirecionar ou limpar)
  cancelar(): void {
    // implementar navegação ou reset
    console.log('Cancelar cadastro');
  }

  // Função para limpar o formulário
  limpar(): void {
    this.fornecedor = {
      nome: '',
      cnpj: '',
      inscricaoEstadual: '',
      telefone: '',
      email: '',
      rua: '',
      numero: null,
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      contatoPrincipal: '',
      telefoneContato: '',
      observacoes: '',
      status: ''
    };
  }

}
