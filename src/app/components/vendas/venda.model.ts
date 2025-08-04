export class Venda {
  vendaId!: number;          // Identificador da venda (chave primária)
  clienteId!: number;        // Id do cliente (FK)
  clienteNome!: string;      // Nome do cliente (opcional para exibição)
  produtoId!: number;        // Id do produto vendido (FK)
  produtoNome!: string;      // Nome do produto (opcional para exibição)
  quantidade!: number;       // Quantidade vendida
  valorUnitario!: number;    // Valor unitário do produto na venda
  valorTotal!: number;       // Valor total (quantidade * valorUnitario)
  dataVenda!: Date;          // Data da venda
  statusVenda!: string;      // Status (Ex: 'Pendente', 'Concluída', 'Cancelada')
}
