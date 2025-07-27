export class Fornecedor {
  id?: number;                // opcional para quando estiver criando ou buscando
  nome: string = '';
  cnpj: string = '';
  inscricaoEstadual: string = '';
  telefone: string = '';
  email: string = '';
  rua: string = '';
  numero: number | null = null;
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  cep: string = '';
  contatoPrincipal: string = '';
  telefoneContato: string = '';
  observacoes: string = '';
  status: boolean = false;

  constructor(init?: Partial<Fornecedor>) {
    Object.assign(this, init);
  }
}
