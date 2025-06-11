import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Import necessário

@Component({
  selector: 'app-estoque-crud',
  templateUrl: './estoque-crud.component.html',
  styleUrls: ['./estoque-crud.component.css']
})
export class EstoqueCrudComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  // Criando interação com botões
  navigateToestoquecreate(): void {
    this.router.navigate(['/estoque/create']);
  }

}
