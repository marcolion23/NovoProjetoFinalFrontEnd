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
  cliCep?: string;        // <---- Adicione esta linha
  cliAtivo?: boolean;
  cliStatus?: string;
  cliDataCadastro?: string;
  cliSexo: string;

  [key: string]: any;  // ESSENCIAL para acesso dinâmico
}
