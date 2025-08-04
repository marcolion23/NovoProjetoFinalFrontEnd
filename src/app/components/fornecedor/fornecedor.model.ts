export class Fornecedor {
  id?: number;
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
  Fordescricao?: string;  // <-- ADICIONE ESTA LINHA
outraCidade?: string;
  complemento?: string;

  
  constructor(init?: Partial<Fornecedor>) {
    Object.assign(this, init);
  }
}
