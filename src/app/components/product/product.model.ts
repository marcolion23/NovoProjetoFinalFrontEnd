// Interface que define a estrutura de um produto
export interface Product {
  proId?: number;               // ID do produto (opcional ao criar, obrigatório para editar/deletar)
  proNome: string;              // Nome do produto
  proPrecoCusto: number;        // Preço de custo
  proPrecoVenda: number;        // Preço de venda
  proCategoria: string;         // Categoria (ex: teclado, mouse, etc.)
  proMarca: string;             // Marca do produto
  proCodigoBarras: string;      // Código de barras
  proEstoque: number;           // Quantidade em estoque
  proAtivo: boolean;            // Produto está ativo ou inativo
}

