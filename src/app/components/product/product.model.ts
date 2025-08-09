export interface Product {
  proId?: number;
  proNome: string;
  proDescricao: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proQuantidadeEstoque: number | null;
  proCategoria: string;
  proCodigoBarras: string;
  proMarca: string;
  proDataCadastro: string;
  forId: number;

  // Campos extras para edição e formatação
  proMarcaPersonalizada?: string;        // marca personalizada quando escolhe "outra"
  proPrecoCustoFormatado?: string;       // para formatar preço na UI
  proPrecoVendaFormatado?: string;       // para formatar preço na UI
}
