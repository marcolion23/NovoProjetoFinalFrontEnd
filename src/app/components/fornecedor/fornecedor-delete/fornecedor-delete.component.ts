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
      this.fornecedorService.readFornecedorById(id).subscribe((res: Fornecedor) => {
        this.fornecedor = res;
      });
    }
  }

  deleteFornecedor(): void {
    if (this.fornecedor.forId) { // Verifica se o ID existe
      this.fornecedorService.deleteFornecedor(this.fornecedor.forId).subscribe(() => {
        this.router.navigate(['/fornecedores']);
        this.fornecedorService.showMessage('Fornecedor excluído com sucesso!');
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }
}