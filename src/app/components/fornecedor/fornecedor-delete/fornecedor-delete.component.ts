import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../fornecedor.service';
import { Fornecedor } from '../fornecedor.model';

@Component({
  selector: 'app-fornecedor-delete',
  templateUrl: './fornecedor-delete.component.html',
  styleUrls: ['./fornecedor-delete.component.css'],
})
export class FornecedorDeleteComponent implements OnInit {
  fornecedor: Fornecedor = {} as Fornecedor;

  constructor(
    private fornecedorService: FornecedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fornecedorService.readById(+id).subscribe((res) => {
        this.fornecedor = res;
      });
    }
  }

  excluir(): void {
    if (this.fornecedor.id) {   // substitua 'id' pelo nome correto do campo do seu model
      this.fornecedorService.delete(this.fornecedor.id).subscribe(() => {
        this.router.navigate(['/fornecedores']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }
}
