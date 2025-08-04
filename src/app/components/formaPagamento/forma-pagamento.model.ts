export interface FormaPagamento {
   fpgId?: number; // ADICIONE ISSO
  fpgDescricao?: string;
  clienteId?: number;
  tipo: string;
  valor?: number;
  data?: Date;
  parcelas?: number;
  status: string;
  observacao?: string;
  parcelado?: string;       // 'sim' | 'nao'
  aplicarTaxas?: string;    // 'sim' | 'nao'
  porcentagemTaxa?: number;
}
