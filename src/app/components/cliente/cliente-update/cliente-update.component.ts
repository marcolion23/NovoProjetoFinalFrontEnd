import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../cliente.service';

interface Cliente {
  cliNome: string;
  cliCpf: string;
  cliDataNascimento: Date | null;
  cliTelefone: string;
  cliEmail: string;
  cliSexo: string;
  estado?: string;      // para o endereço manual
  cidade?: string;      // para o endereço manual
  rua?: string;         // endereço manual
  numero?: number;      // endereço manual
  bairro?: string;      // endereço manual
}

interface EstadoECidades {
  nome: string;
  cidades: string[];
}

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',
    cliDataNascimento: null,
    cliTelefone: '',
    cliEmail: '',
    cliSexo: '',
    estado: '',
    cidade: '',
    rua: '',
    numero: undefined,
    bairro: ''
  };

  cep: string = '';
  numeroResidencia: string = '';
  endereco: any = null;
  mostrarEndereco: boolean = false;
  cepInvalido: boolean = false;

  mostrarEnderecoManual: boolean = false; // controla modo manual
  nomeOutraCidade: string = '';
mostrarCampoOutraCidade: boolean = false;

  
    estadosECidades: EstadoECidades[] = [
    {
      "nome": "Acre",
      "cidades": [
        "Rio Branco",
        "Cruzeiro do Sul",
        "Sena Madureira",
        "Tarauacá",
        "Feijó",
        "Brasiléia",
        "Xapuri",
        "Plácido de Castro",
        "Jordão",
        "Assis Brasil",
        "Manoel Urbano",
        "Mâncio Lima",
        "Porto Walter",
        "Santa Rosa do Purus",
        "Rodrigues Alves",
        "outraCidade"
      ]
    },
    {
      "nome": "Alagoas",
      "cidades": [
        "Maceió",
        "Arapiraca",
        "Palmeira dos Índios",
        "Rio Largo",
        "União dos Palmares",
        "São Miguel dos Campos",
        "Delmiro Gouveia",
        "Coruripe",
        "Penedo",
        "Satuba",
        "Campo Alegre",
        "Craíbas",
        "Girau do Ponciano",
        "Marechal Deodoro",
        "Santana do Ipanema",
        "outraCidade"
      ]
    },
    {
      "nome": "Amapá",
      "cidades": [
        "Macapá",
        "Santana",
        "Laranjal do Jari",
        "Oiapoque",
        "Porto Grande",
        "Mazagão",
        "Calçoene",
        "Pedra Branca do Amapari",
        "Vitória do Jari",
        "Amapá",
        "Cutias",
        "Ferreira Gomes",
        "Pracuúba",
        "Itaubal",
        "Serra do Navio",
        "outraCidade"
      ]
    },
    {
      "nome": "Amazonas",
      "cidades": [
        "Manaus",
        "Parintins",
        "Itacoatiara",
        "Manacapuru",
        "Coari",
        "Tefé",
        "Tabatinga",
        "Humaitá",
        "Benjamin Constant",
        "Eirunepé",
        "São Gabriel da Cachoeira",
        "Presidente Figueiredo",
        "Lábrea",
        "Autazes",
        "Urucará",
        "outraCidade"
      ]
    },
    {
      "nome": "Bahia",
      "cidades": [
        "Salvador",
        "Feira de Santana",
        "Vitória da Conquista",
        "Camaçari",
        "Itabuna",
        "Juazeiro",
        "Lauro de Freitas",
        "Ilhéus",
        "Teixeira de Freitas",
        "Barreiras",
        "Alagoinhas",
        "Simões Filho",
        "Paulo Afonso",
        "Valença",
        "Santo Antônio de Jesus",
        "outraCidade"
      ]
    },
    {
      "nome": "Ceará",
      "cidades": [
        "Fortaleza",
        "Caucaia",
        "Juazeiro do Norte",
        "Maracanaú",
        "Sobral",
        "Crato",
        "Itapipoca",
        "Canindé",
        "Iguatu",
        "Quixadá",
        "Russas",
        "Tauá",
        "Icó",
        "Pacajus",
        "Barbalha",
        "outraCidade"
      ]
    },
    {
      "nome": "Distrito Federal",
      "cidades": [
        "Brasília",
        "outraCidade"
      ]
    },
    {
      "nome": "Espírito Santo",
      "cidades": [
        "Vitória",
        "Vila Velha",
        "Serra",
        "Cariacica",
        "Cachoeiro de Itapemirim",
        "Colatina",
        "Guarapari",
        "Linhares",
        "São Mateus",
        "Viana",
        "Aracruz",
        "Santa Teresa",
        "Iconha",
        "Fundão",
        "Baixo Guandu",
        "outraCidade"
      ]
    },
    {
      "nome": "Goiás",
      "cidades": [
        "Goiânia",
        "Aparecida de Goiânia",
        "Anápolis",
        "Rio Verde",
        "Luziânia",
        "Águas Lindas de Goiás",
        "Formosa",
        "Trindade",
        "Catalão",
        "Valparaíso de Goiás",
        "Novo Gama",
        "Inhumas",
        "Senador Canedo",
        "Itumbiara",
        "Goianésia",
        "outraCidade"
      ]
    },
    {
      "nome": "Maranhão",
      "cidades": [
        "São Luís",
        "Imperatriz",
        "Timon",
        "Caxias",
        "Codó",
        "Bacabal",
        "Santa Inês",
        "Açailândia",
        "Paço do Lumiar",
        "Zé Doca",
        "Coronel Fabriciano",
        "Pindaré Mirim",
        "Coroatá",
        "Barra do Corda",
        "Chapadinha",
        "outraCidade"
      ]
    },
    {
      "nome": "Mato Grosso",
      "cidades": [
        "Cuiabá",
        "Várzea Grande",
        "Rondonópolis",
        "Sinop",
        "Tangará da Serra",
        "Lucas do Rio Verde",
        "Sorriso",
        "Primavera do Leste",
        "Nova Mutum",
        "Campo Verde",
        "Diamantino",
        "Barra do Garças",
        "Juara",
        "Confresa",
        "São Félix do Araguaia",
        "outraCidade"
      ]
    },
    {
      "nome": "Mato Grosso do Sul",
      "cidades": [
        "Campo Grande",
        "Dourados",
        "Três Lagoas",
        "Corumbá",
        "Ponta Porã",
        "Naviraí",
        "Aquidauana",
        "Nova Andradina",
        "Paranaíba",
        "Bataguassu",
        "Sidrolândia",
        "Cassilândia",
        "Maracaju",
        "Aparecida do Taboado",
        "Costa Rica",
        "outraCidade"
      ]
    },
    {
      "nome": "Minas Gerais",
      "cidades": [
        "Belo Horizonte",
        "Uberlândia",
        "Contagem",
        "Juiz de Fora",
        "Betim",
        "Montes Claros",
        "Ribeirão das Neves",
        "Uberaba",
        "Governador Valadares",
        "Ipatinga",
        "Santa Luzia",
        "Sete Lagoas",
        "Divinópolis",
        "Ibirité",
        "Varginha",
        "outraCidade"
      ]
    },
    {
      "nome": "Pará",
      "cidades": [
        "Belém",
        "Ananindeua",
        "Santarém",
        "Marabá",
        "Parauapebas",
        "Castanhal",
        "Capanema",
        "Bragança",
        "Tailândia",
        "Barcarena",
        "Tucuruí",
        "Cametá",
        "Abaetetuba",
        "Paragominas",
        "Moju",
        "outraCidade"
      ]
    },
    {
      "nome": "Paraíba",
      "cidades": [
        "João Pessoa",
        "Campina Grande",
        "Santa Rita",
        "Bayeux",
        "Patos",
        "Cabedelo",
        "Sousa",
        "Guarabira",
        "Caaporã",
        "Pombal",
        "Esperança",
        "Cajazeiras",
        "Monteiro",
        "Lagoa Seca",
        "Mamanguape",
        "outraCidade"
      ]
    },
    {
      "nome": "Paraná",
      "cidades": [
        "Curitiba",
        "Londrina",
        "Maringá",
        "Ponta Grossa",
        "Cascavel",
        "São José dos Pinhais",
        "Foz do Iguaçu",
        "Colombo",
        "Guarapuava",
        "Paranaguá",
        "Araucária",
        "Pinhais",
        "Apucarana",
        "Francisco Beltrão",
        "Toledo",
        "outraCidade"
      ]
    },
    {
      "nome": "Pernambuco",
      "cidades": [
        "Recife",
        "Jaboatão dos Guararapes",
        "Olinda",
        "Caruaru",
        "Petrolina",
        "Cabo de Santo Agostinho",
        "Paulista",
        "Carpina",
        "Igarassu",
        "Vitória de Santo Antão",
        "São Lourenço da Mata",
        "Garanhuns",
        "Camaragibe",
        "Ipojuca",
        "Goiana",
        "outraCidade"
      ]
    },
    {
      "nome": "Piauí",
      "cidades": [
        "Teresina",
        "Parnaíba",
        "Picos",
        "Piripiri",
        "Floriano",
        "Campo Maior",
        "Barras",
        "Uruçuí",
        "Esperantina",
        "Barras do Piauí",
        "Pedro II",
        "Valença do Piauí",
        "São Raimundo Nonato",
        "União",
        "Altos",
        "outraCidade"
      ]
    },
    {
      "nome": "Rio de Janeiro",
      "cidades": [
        "Rio de Janeiro",
        "São Gonçalo",
        "Duque de Caxias",
        "Nova Iguaçu",
        "Niterói",
        "Belford Roxo",
        "Campos dos Goytacazes",
        "São João de Meriti",
        "Volta Redonda",
        "Magé",
        "Cabo Frio",
        "Nilópolis",
        "Resende",
        "Itaboraí",
        "Queimados",
        "outraCidade"
      ]
    },
    {
      "nome": "Rio Grande do Norte",
      "cidades": [
        "Natal",
        "Mossoró",
        "Parnamirim",
        "São Gonçalo do Amarante",
        "Macau",
        "Ceará-Mirim",
        "Caicó",
        "Currais Novos",
        "São José de Mipibu",
        "Santa Cruz",
        "Assu",
        "Alexandria",
        "Touros",
        "Parelhas",
        "Jucurutu",
        "outraCidade"
      ]
    },
    {
      "nome": "Rio Grande do Sul",
      "cidades": [
        "Porto Alegre",
        "Caxias do Sul",
        "Pelotas",
        "Canoas",
        "Santa Maria",
        "Gravataí",
        "Viamão",
        "Novo Hamburgo",
        "São Leopoldo",
        "Rio Grande",
        "Alvorada",
        "Santa Cruz do Sul",
        "Passo Fundo",
        "Sapucaia do Sul",
        "Bento Gonçalves",
        "outraCidade"
      ]
    },
    {
      "nome": "Rondônia",
      "cidades": [
        "Porto Velho",
        "Ji-Paraná",
        "Ariquemes",
        "Cacoal",
        "Vilhena",
        "Jaru",
        "Guajará-Mirim",
        "Rolim de Moura",
        "Colorado do Oeste",
        "Pimenta Bueno",
        "Machadinho d'Oeste",
        "Cerejeiras",
        "Espigão d'Oeste",
        "Alto Alegre dos Parecis",
        "Buritis",
        "outraCidade"
      ]
    },
    {
      "nome": "Roraima",
      "cidades": [
        "Boa Vista",
        "Pacaraima",
        "Mucajaí",
        "Caracaraí",
        "Normandia",
        "Cantá",
        "Bonfim",
        "Iracema",
        "Uiramutã",
        "São João da Baliza",
        "Rorainópolis",
        "Amajari",
        "São Luiz",
        "Lavandeira",
        "Rorainópolis",
        "outraCidade"
      ]
    },
    {
      "nome": "Santa Catarina",
      "cidades": [
        "Florianópolis",
        "Joinville",
        "Blumenau",
        "São José",
        "Criciúma",
        "Chapecó",
        "Itajaí",
        "Jaraguá do Sul",
        "Lages",
        "Balneário Camboriú",
        "Brusque",
        "Tubarão",
        "Palhoça",
        "Caçador",
        "Videira",
        "outraCidade"
      ]
    },
    {
      "nome": "São Paulo",
      "cidades": [
        "São Paulo",
        "Campinas",
        "São Bernardo do Campo",
        "Santo André",
        "Guarulhos",
        "Osasco",
        "São José dos Campos",
        "Ribeirão Preto",
        "Sorocaba",
        "Mauá",
        "São José do Rio Preto",
        "Mogi das Cruzes",
        "Bauru",
        "Diadema",
        "Carapicuíba",
        "outraCidade"
      ]
    },
    {
      "nome": "Sergipe",
      "cidades": [
        "Aracaju",
        "Nossa Senhora do Socorro",
        "Lagarto",
        "Itabaiana",
        "São Cristóvão",
        "Estância",
        "Simão Dias",
        "Itabaianinha",
        "Propriá",
        "Capela",
        "Umbaúba",
        "Pirambu",
        "Nossa Senhora da Glória",
        "Lagarto",
        "Itaporanga d'Ajuda",
        "outraCidade"
      ]
    },
    {
      "nome": "Tocantins",
      "cidades": [
        "Palmas",
        "Araguaína",
        "Gurupi",
        "Porto Nacional",
        "Paraíso do Tocantins",
        "Colinas do Tocantins",
        "Guaraí",
        "Pedro Afonso",
        "Araguatins",
        "Augustinópolis",
        "Axixá do Tocantins",
        "Barra do Ouro",
        "Bom Jesus do Tocantins",
        "Carrasco Bonito",
        "Colméia",
        "outraCidade"
      ]
    }
  ];
  cidadesFiltradas: string[] = [];

  maxDate = new Date();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
capitalizeFirst(fieldName: string | any, propertyName?: string) {
  if (typeof fieldName === 'string') {
    if (propertyName && (this.cliente as any)[propertyName]) {
      (this.cliente as any)[propertyName] = (this.cliente as any)[propertyName]
        .toString()
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
    } else if (fieldName === 'cliNome' && this.cliente.cliNome) {
      this.cliente.cliNome = this.cliente.cliNome.replace(/\b\w/g, (c: string) => c.toUpperCase());
    }
  } else if (typeof fieldName === 'string' && !propertyName) {
    this.cliente.cliNome = this.cliente.cliNome.replace(/\b\w/g, (c: string) => c.toUpperCase());
  } else if (typeof fieldName === 'string' && propertyName) {
    (this.cliente as any)[propertyName] = (this.cliente as any)[propertyName]
      .toString()
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  } else if (typeof fieldName === 'string') {
    this.nomeOutraCidade = this.nomeOutraCidade.replace(/\b\w/g, (c: string) => c.toUpperCase());
  }
}


  mascaraCpf() {
    let v = this.cliente.cliCpf.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.cliente.cliCpf = v;
  }

  mascaraTelefone() {
    let v = this.cliente.cliTelefone.replace(/\D/g, '');
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
    this.cliente.cliTelefone = v;
  }

  apenasNumeros(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  apenasNumerosComMascaraCep(event: KeyboardEvent) {
    const allowedChars = '0123456789-';
    if (!allowedChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  onCepInput() {
    const cepSomenteNumeros = this.cep.replace(/\D/g, '');
    if (cepSomenteNumeros.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepSomenteNumeros}/json/`).subscribe({
        next: (data: any) => {
          if (data.erro) {
            this.cepInvalido = true;
            this.mostrarEndereco = false;
            this.endereco = null;
          } else {
            this.cepInvalido = false;
            this.mostrarEndereco = true;
            this.endereco = data;

            // Atualiza campos do cliente para endereço automático
            this.cliente.estado = data.uf;
            this.cliente.cidade = data.localidade;
            this.cliente.rua = data.logradouro;
            this.cliente.bairro = data.bairro || '';
          }
        },
        error: () => {
          this.cepInvalido = true;
          this.mostrarEndereco = false;
          this.endereco = null;
        }
      });
    } else {
      this.cepInvalido = false;
      this.mostrarEndereco = false;
      this.endereco = null;
    }
  }

  ativarEnderecoManual() {
    this.mostrarEnderecoManual = true;
    this.mostrarEndereco = false;
    this.cep = '';
    this.endereco = null;
    this.cepInvalido = false;

    this.cidadesFiltradas = [];
    this.mostrarCampoOutraCidade = false;

    this.cliente.estado = '';
    this.cliente.cidade = '';
    this.cliente.rua = '';
    this.cliente.numero = undefined;
    this.cliente.bairro = '';
  }

  desativarEnderecoManual() {
    this.mostrarEnderecoManual = false;
    this.cliente.estado = '';
    this.cliente.cidade = '';
    this.cliente.rua = '';
    this.cliente.numero = undefined;
    this.cliente.bairro = '';
    this.mostrarCampoOutraCidade = false;
  }

  onEstadoChange(estadoSelecionado: string) {
    const estado = this.estadosECidades.find(e => e.nome === estadoSelecionado);
    if (estado) {
      this.cidadesFiltradas = estado.cidades;
    } else {
      this.cidadesFiltradas = [];
    }

    this.cliente.cidade = '';
    this.mostrarCampoOutraCidade = false;
    this.nomeOutraCidade = '';
  }



  bloquearNumeros(event: KeyboardEvent) {
    // Bloqueia números no campo rua
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  salvar() {
    // Validação dos campos obrigatórios
    let enderecoValido = false;

    if (this.mostrarEndereco) {
      enderecoValido = !!(
        this.cep &&
        this.endereco &&
        this.endereco.uf &&
        this.endereco.localidade &&
        this.endereco.logradouro &&
        this.numeroResidencia
      );
    } else if (this.mostrarEnderecoManual) {
      enderecoValido = !!(
        this.cliente.estado &&
        (this.cliente.cidade && (this.cliente.cidade !== 'Outra Cidade' || this.nomeOutraCidade.trim() !== '')) &&
        this.cliente.rua &&
        this.cliente.numero !== undefined
      );
    }

    if (
      this.cliente.cliNome &&
      this.cliente.cliCpf &&
      this.cliente.cliDataNascimento &&
      this.cliente.cliTelefone &&
      this.cliente.cliEmail &&
      this.cliente.cliSexo &&
      enderecoValido
    ) {
      // Prepara o objeto final a ser enviado
      const dadosCliente = {
        ...this.cliente,
        endereco: this.mostrarEnderecoManual
          ? {
              uf: this.cliente.estado,
              localidade: this.cliente.cidade === 'Outra Cidade' ? this.nomeOutraCidade : this.cliente.cidade,
              logradouro: this.cliente.rua,
              numero: this.cliente.numero,
              bairro: this.cliente.bairro,
              pais: 'Brasil',
              cep: null
            }
          : {
              cep: this.cep,
              uf: this.endereco.uf,
              localidade: this.endereco.localidade,
              logradouro: this.endereco.logradouro,
              numero: this.numeroResidencia,
              pais: 'Brasil'
            }
      };

      console.log('Cliente salvo:', dadosCliente);
      alert('Cliente salvo com sucesso!');
      this.limpar();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cancel() {
    if (confirm('Deseja cancelar o cadastro? Todas as informações serão perdidas.')) {
      this.limpar();
    }
  }

  limpar(form?: any) {
    this.cliente = {
      cliNome: '',
      cliCpf: '',
      cliDataNascimento: null,
      cliTelefone: '',
      cliEmail: '',
      cliSexo: '',
      estado: '',
      cidade: '',
      rua: '',
      numero: undefined,
      bairro: ''
    };
    this.cep = '';
    this.numeroResidencia = '';
    this.endereco = null;
    this.mostrarEndereco = false;
    this.mostrarEnderecoManual = false;
    this.cepInvalido = false;
    this.mostrarCampoOutraCidade = false;
    this.nomeOutraCidade = '';

    this.cidadesFiltradas = [];

    if (form) form.resetForm();
  }
  onCidadeSelecionada(cidade: string) {
  this.mostrarCampoOutraCidade = cidade === 'outraCidade';
}
capitalizeWords(texto: string): string {
  if (!texto) return '';
  return texto
    .toLowerCase()
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}

}
