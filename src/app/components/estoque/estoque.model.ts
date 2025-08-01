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
  dataCadastro: string; // note que aqui é string (provavelmente ISO date)
  proAtivo: boolean;
}
