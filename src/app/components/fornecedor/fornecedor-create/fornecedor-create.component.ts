import { Component, OnInit } from '@angular/core';

interface Fornecedor {
  [key: string]: any; // Permite acesso dinâmico
  nome: string;
  cnpj: string;
  inscricaoEstadual: string;
  telefone: string;
  email: string;
  rua: string;
  numero: number | null;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  contatoPrincipal: string;
  telefoneContato: string;
  observacoes: string;
  status: string;
}


@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.css']
})
export class FornecedorCreateComponent implements OnInit {

  fornecedor: Fornecedor = {
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

  estadosECidades = [
    { sigla: 'AC', nome: 'Acre', cidades: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Xapuri', 'Outra cidade'] },
    { sigla: 'AL', nome: 'Alagoas', cidades: ['Maceió', 'Arapiraca', 'Palmeira dos Índios', 'Rio Largo', 'Outra cidade'] },
    // ... restante dos estados
  ];

  estadoSelecionado: string = '';
  todasCidades: string[] = [];
  cidadesFiltradas: string[] = [];
  cidadeBusca: string = '';

  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  telefoneMask = ['(', /[1-9]/, /\d/, ')', ' ', '9', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor() { }

  ngOnInit(): void {
    if (this.fornecedor.estado) {
      this.onEstadoChange(this.fornecedor.estado);
    }
  }

  onEstadoChange(estadoNome: string): void {
    this.estadoSelecionado = estadoNome;
    const estadoObj = this.estadosECidades.find(e => e.nome === estadoNome);
    this.todasCidades = estadoObj ? estadoObj.cidades : ['Outra cidade'];
    this.filtrarCidades('');
    this.fornecedor.cidade = '';
  }

  filtrarCidades(valor: string): void {
    const termo = valor.toLowerCase();
    this.cidadesFiltradas = this.todasCidades.filter(cidade =>
      cidade.toLowerCase().includes(termo)
    );
  }

  onBuscaCidadeInput(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.filtrarCidades(valor);
  }

  capitalizeFirst(texto: string, campo: keyof Fornecedor): void {
    if (!texto) {
      this.fornecedor[campo] = '';
      return;
    }
    const formatted = texto
      .toLowerCase()
      .split(' ')
      .filter(w => w.length > 0)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');
    this.fornecedor[campo] = formatted;
  }

  bloquearNumeros(event: KeyboardEvent): void {
    const tecla = event.key;
    if (/\d/.test(tecla)) {
      event.preventDefault();
    }
  }

  salvar(): void {
    console.log('Salvar fornecedor:', this.fornecedor);
  }

  cancelar(): void {
    console.log('Cadastro cancelado');
  }

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
    this.estadoSelecionado = '';
    this.todasCidades = [];
    this.cidadesFiltradas = [];
    this.cidadeBusca = '';
  }
}
