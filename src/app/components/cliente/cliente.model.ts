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
  cliAtivo?: boolean;
  cliStatus?: string;
  cliDataCadastro?: string;
  cliSexo: string;  // novo campo para sexo

}
