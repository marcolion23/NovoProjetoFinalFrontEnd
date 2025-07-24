export interface Cliente {
  cliId?: number;                  // ID do cliente (opcional para criação)
  cliNome: string;                // Nome completo do cliente
  cliCpf: string;                 // CPF formatado (ex: 000.000.000-00)
  cliEmail: string;              // Email do cliente
  cliTelefone: string;           // Telefone com DDD
  cliDataNascimento?: string;    // Opcional - formato 'YYYY-MM-DD'
  cliRua?: string;               // Opcional - nome da rua
  cliNumero?: number | null;     // Opcional - número da residência
  cliBairro?: string;            // Opcional - bairro
  cliCidade?: string;            // Opcional - cidade
  cliEstado?: string;            // Opcional - estado (sigla)
  cliCep?: string;               // Opcional - CEP
  cliAtivo?: boolean;            // Opcional - status (true = ativo, false = inativo)
}
