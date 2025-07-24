export interface Product {
  proId?: number;
  proNome: string;
  proPrecoCusto: number;
  proPrecoVenda: number;
  proCategoria: string;
  proMarca: string;
  proCodigoBarras: string;
  proEstoque: number;
  proAtivo: boolean;
  proStatus?: string;
  dataCadastro?: Date;
  proEstoqueMinimo?: number;
  proDescricao?: string;
  proImagemUrl?: string;
}
