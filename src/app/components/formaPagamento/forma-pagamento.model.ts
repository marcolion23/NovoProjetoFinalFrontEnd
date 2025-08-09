export interface FormaPagamento {
  fpgId?: number;                         // ID do pagamento (opcional, gerado pelo backend)
  fpgDescricao?: string;                  // Descrição da forma de pagamento (opcional)
  fpgTipo: string;                          // Tipo de pagamento (ex: 'Cartão', 'Boleto') - obrigatório
  fpgPermiteParcelamento?: number;                     // Número de parcelas (opcional)
  fpgNumMaxParcelas?: 'sim' | 'nao' | '';       // Indica se é parcelado (opcional)
  fpgTaxaAdicional?: 'sim' | 'nao' | '';    // Indica se aplica taxas (opcional)
}
