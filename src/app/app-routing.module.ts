import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';

// Produtos
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductReadComponent } from './components/product/product-read/product-read.component';

// Estoque
import { EstoqueCrudComponent } from './views/estoque-crud/estoque-crud.component';
import { EstoqueCreateComponent } from './components/estoque/estoque-create/estoque-create.component';
import { EstoqueDeleteComponent } from './components/estoque/estoque-delete/estoque-delete.component';
import { EstoqueReadComponent } from './components/estoque/estoque-read/estoque-read.component';
import { EstoqueUpdateComponent } from './components/estoque/estoque-update/estoque-update.component';

// Fornecedores
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';

// Clientes
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';

// Pagamentos
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FormaPagamentoUpdateComponent } from './components/formaPagamento/forma-pagamento-update/forma-pagamento-update.component';
import { FormaPagamentoDeleteComponent } from './components/formaPagamento/forma-pagamento-delete/forma-pagamento-delete.component';

// Relatórios, Perfil e Ajustes
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';

// Agendamentos
import { AgendamentoCreateComponent } from './components/agendamentos/agendamento-create/agendamento-create.component';
import { AgendamentoReadComponent } from './components/agendamentos/agendamento-read/agendamento-read.component';
import { AgendamentoUpdateComponent } from './components/agendamentos/agendamento-update/agendamento-update.component';
import { AgendamentoDeleteComponent } from './components/agendamentos/agendamento-delete/agendamento-delete.component';

// ============================ Rotas ============================

const routes: Routes = [
  // Início
  { path: '', component: HomeComponent },

  // Produtos
  { path: 'products', component: ProductCrudComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/read', component: ProductReadComponent },
  { path: 'products/update/:proId', component: ProductUpdateComponent },
  { path: 'products/delete/:proId', component: ProductDeleteComponent },

  // Estoque
  { path: 'estoque', component: EstoqueCrudComponent },
  { path: 'estoque/create', component: EstoqueCreateComponent },
  { path: 'estoque/read', component: EstoqueReadComponent },
  { path: 'estoque/update', component: EstoqueUpdateComponent },
  { path: 'estoque/delete', component: EstoqueDeleteComponent },

  // Fornecedores
  { path: 'fornecedores', component: FornecedorCrudComponent },
  { path: 'fornecedores/create', component: FornecedorCreateComponent },
  { path: 'fornecedores/update/:fornId', component: FornecedorUpdateComponent },
  { path: 'fornecedores/delete/:fornId', component: FornecedorDeleteComponent },
  { path: 'fornecedores/read/:fornId', component: FornecedorReadComponent },

  // Clientes
  { path: 'clientes', component: ClienteCrudComponent },
  { path: 'clientes/create', component: ClienteCreateComponent },
  { path: 'clientes/update/:cliId', component: ClienteUpdateComponent },
  { path: 'clientes/delete/:cliId', component: ClienteDeleteComponent },
  { path: 'clientes/read/:cliId', component: ClienteReadComponent },

  // Pagamentos
  { path: 'fpagamentos', component: FormaPagamentoCrudComponent },
  { path: 'fpagamentos/create', component: FormaPagamentoCreateComponent },
  { path: 'fpagamentos/update/:fpgId', component: FormaPagamentoUpdateComponent },
  { path: 'fpagamentos/delete/:fpgId', component: FormaPagamentoDeleteComponent },

  // Agendamentos
  { path: 'agendamentos/create', component: AgendamentoCreateComponent },
  { path: 'agendamentos/read', component: AgendamentoReadComponent },
  { path: 'agendamentos/update/:agId', component: AgendamentoUpdateComponent },
  { path: 'agendamentos/delete/:agId', component: AgendamentoDeleteComponent },

  // Relatórios
  { path: 'relatorios', component: RelatoriosComponent },

  // Perfil
  { path: 'perfil', component: PerfilComponent },

  // Ajustes
  { path: 'ajustes', component: AjustesComponent }
];

// ============================ Módulo ============================

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
