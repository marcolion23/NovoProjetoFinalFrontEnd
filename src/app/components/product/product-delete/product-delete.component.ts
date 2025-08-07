import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  produto: Product = {} as Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.readById(+id).subscribe((res) => {
        this.produto = res;
      });
    }
  }

  excluir(): void {
    if (this.produto.proId) {
      this.productService.delete(this.produto.proId).subscribe(() => {
        this.router.navigate(['/produtos']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }
}