export interface FormaPagamento {
  fpgId?: number;                         // ID do pagamento (opcional, gerado pelo backend)
  fpgDescricao?: string;                  // Descrição da forma de pagamento (opcional)
  clienteId?: number;                     // ID do cliente associado (opcional)
  tipo: string;                          // Tipo de pagamento (ex: 'Cartão', 'Boleto') - obrigatório
  valor?: number;                        // Valor do pagamento (opcional)
  data?: Date | string;                  // Data do pagamento (opcional) - pode ser Date ou ISO string
  parcelas?: number;                     // Número de parcelas (opcional)
  status: string;                       // Status do pagamento (ex: 'Pago', 'Pendente') - obrigatório
  observacao?: string;                   // Observações adicionais (opcional)
  parcelado?: 'sim' | 'nao' | '';       // Indica se é parcelado (opcional)
  aplicarTaxas?: 'sim' | 'nao' | '';    // Indica se aplica taxas (opcional)
  porcentagemTaxa?: number;              // Porcentagem da taxa aplicada (opcional)
}
