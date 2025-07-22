export interface FormaPagamento {
  fpgId?: number;           // ID do pagamento (opcional para criação)
  fpgDescricao: string;     // Descrição
  clienteId?: number;       // ID do cliente associado
  tipo?: string;            // Tipo: Pix, Cartão, Dinheiro...
  valor?: number;           // Valor do pagamento
  data?: Date;              // Data do pagamento
  parcelas?: number;        // Parcelas se houver
  status?: string;          // Pago, Pendente, Cancelado...
  observacao?: string;      // Campo opcional para observações
}
