import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  productId!: number;  // ID que vem pela URL
  product: any;        // Objeto produto carregado para exibir na tela

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Pega o ID do produto da URL (rota: /products/delete/:proId)
    const id = this.route.snapshot.paramMap.get('proId');
    if (id) {
      this.productId = +id;
      this.loadProduct();
    } else {
      // Se não tiver id na rota, volta para lista
      this.router.navigate(['/products']);
    }
  }

  // Busca o produto pelo ID para mostrar na tela
  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produto:', err);
        this.router.navigate(['/products']);
      }
    });
  }

  // Exclui o produto
  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe({
      next: () => {
        console.log('Produto excluído com sucesso!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Erro ao excluir produto:', err);
      }
    });
  }

  // Cancela exclusão e volta para lista
  cancel(): void {
    this.router.navigate(['/products']);
  }
}
