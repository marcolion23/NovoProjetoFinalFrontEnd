export interface Venda {
  id?: number | null;
  clienteId?: number | null;
  clienteNome?: string;   // está aqui?
  produtoId?: number | null;
  produtoNome?: string;   // está aqui?
  quantidade?: number;    // está aqui?
  valorTotal?: number;
  dataVenda?: Date | null;
  tipoPagamento?: string;
}
