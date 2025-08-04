import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venda-crud',
  templateUrl: './venda-crud.component.html',
  styleUrls: ['./venda-crud.component.css']
})
export class VendaCrudComponent implements OnInit {

  totalVendas: number = 0;
  vendasCanceladas: number = 0;
  ultimaAtualizacao: string = '';

  constructor() {}

  ngOnInit(): void {
    // Simula carregamento dos dados do dashboard
    this.carregarDadosDashboard();
  }

  carregarDadosDashboard(): void {
    // Aqui você pode fazer uma chamada ao backend para buscar dados reais,
    // por enquanto vamos simular os dados:

    this.totalVendas = 158;           // Exemplo: total de vendas feitas
    this.vendasCanceladas = 7;        // Exemplo: total de vendas canceladas
    this.ultimaAtualizacao = this.formatarData(new Date());  // Data atual formatada
  }

  formatarData(data: Date): string {
    // Formata a data para DD/MM/YYYY HH:mm
    const dia = this.pad(data.getDate());
    const mes = this.pad(data.getMonth() + 1);
    const ano = data.getFullYear();
    const hora = this.pad(data.getHours());
    const minutos = this.pad(data.getMinutes());
    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

}
