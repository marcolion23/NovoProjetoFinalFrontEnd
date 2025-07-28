export interface FormaPagamento {
  fpgId?: number;
  fpgDescricao: string;
  clienteId?: number;    // Id do cliente para relacionar com cadastro
  clienteNome?: string;  // Opcional: nome do cliente para exibição (se desejar)
  tipo?: string;
  valor?: number;
  data?: Date;
  parcelas?: number;
  status?: string;
  observacao?: string;
}
