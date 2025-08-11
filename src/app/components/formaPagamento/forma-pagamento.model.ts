export interface FormaPagamento {
  fpgId?: number;                         // ID da forma de pagamento (opcional, gerado pelo backend)
  fpgDescricao: string;                   // Descrição da forma de pagamento (obrigatório)
  fpgTipo: string;                        // Tipo de pagamento (ex: 'Credito', 'Debito', 'Pix') - obrigatório
  fpgPermiteParcelamento?: string;        // Permite parcelamento: "S" ou "N" (opcional)
  fpgNumMaxParcelas?: number;             // Número máximo de parcelas (opcional)
  fpgTaxaAdicional?: number;              // Taxa adicional em porcentagem (opcional)
}
