import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service'; // adapte o caminho

interface Fornecedor {
  id?: number;
  nome: string;
  cnpj: string;
  inscricaoEstadual: string;
  telefone: string;
  email: string;
  contatoPrincipal: string;
  telefoneContato: string;
  rua: string;
  numero: number | null;  // ALTERADO aqui
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
  status: boolean;
  observacoes: string;
}


interface EstadoECidade {
  nome: string;
  cidades: string[];
}

@Component({
  selector: 'app-fornecedor-update',
  templateUrl: './fornecedor-update.component.html',
  styleUrls: ['./fornecedor-update.component.css']
})
export class FornecedorUpdateComponent implements OnInit {

  fornecedor: Fornecedor = {
    nome: '',
    cnpj: '',
    inscricaoEstadual: '',
    telefone: '',
    email: '',
    contatoPrincipal: '',
    telefoneContato: '',
    rua: '',
    numero: 0,
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    status: true,
    observacoes: ''
  };

  nomeOutraCidade: string = '';
  mostrarCampoOutraCidade: boolean = false;

  cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  telefoneMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  estadosECidades: EstadoECidade[] = 
   [
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fornecedorService.readById(+id).subscribe((fornecedor) => {
        this.fornecedor = fornecedor;

        // Atualiza cidades filtradas com base no estado carregado
        this.onEstadoChange(this.fornecedor.estado);

        // Se cidade não estiver na lista, mostra campo "Outra cidade"
        if (this.fornecedor.cidade) {
          const estadoObj = this.estadosECidades.find(e => e.nome === this.fornecedor.estado);
          if (estadoObj && !estadoObj.cidades.includes(this.fornecedor.cidade)) {
            this.mostrarCampoOutraCidade = true;
            this.nomeOutraCidade = this.fornecedor.cidade;
            this.fornecedor.cidade = '';
          }
        }
      });
    } else {
      // Se não tiver id na rota, pode redirecionar ou inicializar vazio
      this.router.navigate(['/fornecedores']);
    }
  }

  onEstadoChange(estadoSelecionado: string): void {
    const estado = this.estadosECidades.find(e => e.nome === estadoSelecionado);
    this.cidadesFiltradas = estado ? estado.cidades : [];
    if (!this.cidadesFiltradas.includes(this.fornecedor.cidade)) {
      this.mostrarCampoOutraCidade = true;
      this.nomeOutraCidade = this.fornecedor.cidade || '';
      this.fornecedor.cidade = '';
    } else {
      this.mostrarCampoOutraCidade = false;
      this.nomeOutraCidade = '';
    }
  }

  onBuscaCidadeInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    const estadoSelecionado = this.fornecedor.estado;
    const estado = this.estadosECidades.find(e => e.nome === estadoSelecionado);
    this.cidadesFiltradas = estado ? estado.cidades.filter(c => c.toLowerCase().includes(input)) : [];
  }

  onCidadeSelecionada(cidade: string): void {
    if (cidade.toLowerCase() === 'outracidade' || cidade.toLowerCase() === 'outra cidade') {
      this.mostrarCampoOutraCidade = true;
      this.fornecedor.cidade = '';
    } else {
      this.mostrarCampoOutraCidade = false;
      this.fornecedor.cidade = cidade;
      this.nomeOutraCidade = '';
    }
  }

  bloquearNumeros(event: KeyboardEvent): void {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  }

  capitalizeFirst(value: string, campo?: keyof Fornecedor): void {
    if (value) {
      const capitalizado = value
        .toLowerCase()
        .replace(/\b\w/g, letra => letra.toUpperCase());

      if (campo) {
        (this.fornecedor as any)[campo] = capitalizado;
      } else {
        this.nomeOutraCidade = capitalizado;
      }
    }
  }

  salvar(): void {
    if (this.mostrarCampoOutraCidade && this.nomeOutraCidade.trim()) {
      this.fornecedor.cidade = this.nomeOutraCidade.trim();
    }
    if (this.fornecedor.id) {
      this.fornecedorService.updateFornecedor(this.fornecedor.id, this.fornecedor).subscribe(() => {
        this.router.navigate(['/fornecedores']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }

  limpar(): void {
    // Você pode decidir se no update quer limpar ou não, geralmente não limpa.
    // Aqui, para resetar para os dados originais do fornecedor:
    if (this.fornecedor.id) {
      this.fornecedorService.readById(this.fornecedor.id).subscribe((fornecedor) => {
        this.fornecedor = fornecedor;
        this.onEstadoChange(this.fornecedor.estado);
        this.mostrarCampoOutraCidade = false;
        this.nomeOutraCidade = '';
      });
    }
  }
}
