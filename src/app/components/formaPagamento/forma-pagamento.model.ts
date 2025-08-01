export interface FormaPagamento {
  fpgId?: number;               // ID da forma de pagamento (opcional para criação)
  fpgDescricao: string;         // Descrição da forma de pagamento (obrigatório)
  clienteId?: number;           // ID do cliente relacionado (opcional)
  clienteNome?: string;         // Nome do cliente para exibição (opcional)
  tipo?: string;                // Tipo da forma de pagamento (ex: 'Cartão', 'Boleto')
  valor?: number;               // Valor pago
  data?: string | Date;         // Data do pagamento (string ISO ou Date)
  parcelas?: number;            // Número de parcelas, se parcelado
  status?: string;              // Status do pagamento (ex: 'Pago', 'Pendente')
  observacao?: string;          // Observações adicionais (opcional)
}
