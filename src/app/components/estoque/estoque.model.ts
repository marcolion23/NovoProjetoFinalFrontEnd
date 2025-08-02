export interface EstoqueModel {
  proId: number;
  proNome: string;
  proCodigoBarras: string;
  proDescricao: string;
  proCategoria: string;
  proMarca: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proEstoque: number;
  proAtivo: boolean;
  dataCadastro: Date;
  proMarcaPersonalizada?: string; // opcional
  proPrecoCustoFormatado?: string; // opcional para exibição no template
  proPrecoVendaFormatado?: string; // opcional para exibição no template
}
