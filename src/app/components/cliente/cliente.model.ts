export interface Cliente {
  cliId?: number;
  cliNome: string;
  cliCpf: string;
  cliEmail: string;
  cliTelefone: string;
  cliDataNascimento?: string;
  cliRua?: string;
  cliNumero?: number | null;
  cliBairro?: string;
  cliCidade?: string;
  cliEstado?: string;
  cliCep?: string;    
  cliDataCadastro?: string;
  [key: string]: any;  // ESSENCIAL para acesso dinâmico
}
