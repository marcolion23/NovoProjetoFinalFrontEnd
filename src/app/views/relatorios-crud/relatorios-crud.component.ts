import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios-crud',
  templateUrl: './relatorios-crud.component.html',
  styleUrls: ['./relatorios-crud.component.css']
})
export class RelatoriosCrudComponent implements OnInit {

  totalRelatoriosGerados: number = 123;  // valor exemplo
  ultimaGeracao: string = '2025-07-22 14:00';
  relatorioMaisAcessado: string = 'Relatório de Produtos';

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode colocar lógica para carregar dados reais, se quiser
  }

}
