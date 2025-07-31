export interface Product {
  proId?: number;
  proNome: string;
  proCodigoBarras: string;
  proDescricao: string;
  proCategoria: string;
  proMarca: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proEstoque: number;
  proAtivo: boolean;
  dataCadastro?: Date | string;

  // Campos extras para edição e formatação
  proMarcaPersonalizada?: string;        // marca personalizada quando escolhe "outra"
  proPrecoCustoFormatado?: string;       // para formatar preço na UI
  proPrecoVendaFormatado?: string;       // para formatar preço na UI
}
