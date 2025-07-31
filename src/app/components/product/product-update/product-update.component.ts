import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    proId: 0,
    proNome: '',
    proCodigoBarras: '',
    proDescricao: '',
    proCategoria: '',
    proMarca: '',
    proPrecoCusto: 0,
    proPrecoVenda: 0,
    proEstoque: 0,
    proAtivo: true,
    dataCadastro: new Date()
  };

  // Para manipular a data separadamente no HTML (se quiser)
  dataCadastro: Date = new Date();

  mostrarInputOutraMarca = false;
  marcaPersonalizada: string = '';
  maxDate: Date = new Date(); // Define a data máxima como a data atual

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const proId = this.route.snapshot.paramMap.get('proId');
    if (proId) {
      this.productService.readById(proId).subscribe((product: Product) => {
        this.product = product;
        // Inicializa a data no campo separado (caso esteja separado)
        this.dataCadastro = new Date(product.dataCadastro || new Date());
        // Se a marca for "outra", mostrar input para marca personalizada
        this.mostrarInputOutraMarca = (product.proMarca === 'outra');
        if(this.mostrarInputOutraMarca) {
          this.marcaPersonalizada = product.proMarcaPersonalizada || '';
        }
      });
    }
  }

  salvar(): void {
    // Atualizar a data no product antes de salvar
    this.product.dataCadastro = this.dataCadastro;

    // Se a marca personalizada estiver preenchida, salvar no objeto
    if (this.mostrarInputOutraMarca && this.marcaPersonalizada.trim() !== '') {
      this.product.proMarcaPersonalizada = this.marcaPersonalizada.trim();
      this.product.proMarca = 'outra';
    }

    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  limpar(): void {
    // Reseta o formulário
    this.product = {
      proId: 0,
      proNome: '',
      proCodigoBarras: '',
      proDescricao: '',
      proCategoria: '',
      proMarca: '',
      proPrecoCusto: 0,
      proPrecoVenda: 0,
      proEstoque: 0,
      proAtivo: true,
      dataCadastro: new Date()
    };
    this.dataCadastro = new Date();
    this.mostrarInputOutraMarca = false;
    this.marcaPersonalizada = '';
  }

  onMarcaChange(marca: string): void {
    this.mostrarInputOutraMarca = (marca === 'outra');
    if (!this.mostrarInputOutraMarca) {
      this.marcaPersonalizada = '';
    }
  }

  // Implementações de ajuda para formatar e validar (você pode ter em outro lugar)
  apenasLetras(event: KeyboardEvent): void {
    const pattern = /[a-zA-ZÀ-ÿ\s]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  apenasNumeros(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  formatarNome(): void {
    if (this.product.proNome) {
      this.product.proNome = this.product.proNome.trimStart();
    }
  }

  formatarDescricao(): void {
    if (this.product.proDescricao) {
      this.product.proDescricao = this.product.proDescricao.trimStart();
    }
  }

  formatarMarcaPersonalizada(): void {
    if (this.marcaPersonalizada) {
      this.marcaPersonalizada = this.marcaPersonalizada.trimStart();
    }
  }

  limparZeroInicial(): void {
    if (this.product.proEstoque) {
      this.product.proEstoque = Number(String(this.product.proEstoque).replace(/^0+/, '')) || 0;
    }
  }

  onPrecoInput(event: any, campo: 'proPrecoCusto' | 'proPrecoVenda'): void {
    // Exemplo de formatação simples, você pode melhorar
    const valor = event.replace(/[^0-9,]/g, '').replace(',', '.');
    this.product[campo] = parseFloat(valor) || 0;
  }

  getNomeCategoria(categoriaKey: string): string {
    const categorias: {[key: string]: string} = {
      teclado: 'Teclado',
      mouse: 'Mouse',
      monitor: 'Monitor',
      headset: 'Headset',
      mousepad: 'MousePad',
      cadeira: 'Cadeira Gamer',
      console: 'Console',
      controle: 'Controle',
      notebook: 'Notebook Gamer',
      'placa-video': 'Placa de Vídeo',
      cpu: 'Processador (CPU)',
      ram: 'Memória RAM',
      fonte: 'Fonte',
      gabinete: 'Gabinete',
      cooler: 'Cooler / WaterCooler',
      jogos: 'Jogos',
      giftcards: 'Gift Cards',
      servicos: 'Serviços Técnicos',
      acessorios: 'Acessórios'
    };
    return categorias[categoriaKey] || '';
  }
}
