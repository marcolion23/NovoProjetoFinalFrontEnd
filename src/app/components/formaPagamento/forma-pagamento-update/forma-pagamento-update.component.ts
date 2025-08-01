import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormaPagamentoService } from '../forma-pagamento.service';
import { FormaPagamento } from '../forma-pagamento.model';
import { Cliente } from '../../cliente/cliente.model'; // ajuste se estiver em outro lugar
import { ClienteService } from '../../cliente/cliente.service';

@Component({
  selector: 'app-forma-pagamento-update',
  templateUrl: './forma-pagamento-update.component.html',
  styleUrls: ['./forma-pagamento-update.component.css']
})
export class FormaPagamentoUpdateComponent implements OnInit {

  formaPagamento!: FormaPagamento;

  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteFiltro: string = '';
  maxDate: Date = new Date();
  valorFormatado: string = '';

  constructor(
    private formaPagamentoService: FormaPagamentoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const fpgId = this.route.snapshot.paramMap.get('fpgId');
    if (fpgId) {
      this.formaPagamentoService.readById(+fpgId).subscribe({
        next: (fp: FormaPagamento) => {
          this.formaPagamento = fp;
          this.valorFormatado = this.formatarValor(fp.valor ?? 0);
        },
        error: () => {
          this.formaPagamentoService.showMessage('Erro ao carregar dados!');
          this.router.navigate(['/fpagamentos']);
        }
      });
    }

    this.clienteService.read().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesFiltrados = clientes;
    });
  }

  // Compara objetos cliente para o select
  compareClientes(a: Cliente | number | null, b: Cliente | number | null): boolean {
    if (a === null || b === null) return false;
    if (typeof a === 'number' && typeof b === 'number') return a === b;
    if (typeof a === 'object' && typeof b === 'object') return a.cliId === b.cliId;
    if (typeof a === 'object' && typeof b === 'number') return a.cliId === b;
    if (typeof b === 'object' && typeof a === 'number') return b.cliId === a;
    return false;
  }

  onClienteSelectOpened(opened: boolean): void {
    if (opened) {
      this.clientesFiltrados = this.clientes;
    }
  }

  filtrarClientes(): void {
    const filtro = this.clienteFiltro.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(c =>
      c.cliNome.toLowerCase().includes(filtro)
    );
  }

  onTipoPagamentoChange(tipo: string): void {
    if (tipo !== 'Cartão de Crédito') {
      this.formaPagamento.parcelas = 1;
    }
  }

  onValorInput(event: any): void {
    const valor = event.target.value.replace(/\D/g, '');
    const valorFloat = parseFloat(valor) / 100;
    this.formaPagamento.valor = valorFloat;
    this.valorFormatado = this.formatarValor(valorFloat);
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).replace('R$', '').trim();
  }

  bloquearTeclasInvalidas(event: KeyboardEvent): void {
    const teclasValidas = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (!/^\d$/.test(event.key) && !teclasValidas.includes(event.key)) {
      event.preventDefault();
    }
  }

  updateFormaPagamento(): void {
    this.formaPagamentoService.update(this.formaPagamento).subscribe({
      next: () => {
        this.formaPagamentoService.showMessage('Forma de pagamento atualizada com sucesso!');
        this.router.navigate(['/fpagamentos']);
      },
      error: () => {
        this.formaPagamentoService.showMessage('Erro ao atualizar forma de pagamento!');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/fpagamentos']);
  }

  limpar(): void {
    this.formaPagamento = {
      clienteId: undefined,
      fpgDescricao: '',
      tipo: '',
      valor: 0,
      data: undefined,
      parcelas: 1,
      status: '',
      observacao: ''
    } as FormaPagamento;

    this.valorFormatado = '';
    this.clienteFiltro = '';
    this.clientesFiltrados = [...this.clientes];
  }
}
