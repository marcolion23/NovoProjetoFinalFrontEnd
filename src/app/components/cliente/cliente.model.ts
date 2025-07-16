export interface Cliente {
    cliId?: number;  
    cliNome: string;
    cliCpf: string;
    cliEmail: string;
    cliTelefone: string;
    cliDataNascimento?: string;  // Campo opcional - data como string (ex: '2025-06-17')
    cliRua?: string;              // Opcional - endereço
    cliNumero?: number | null;        // Opcional - número da residência
    cliBairro?: string;           // Opcional - bairro
    cliCidade?: string;           // Opcional - cidade
    cliEstado?: string;           // Opcional - estado
    cliCep?: string;              // Opcional - CEP
    cliAtivo?: boolean;           // Opcional - status do cliente


    
  }
  