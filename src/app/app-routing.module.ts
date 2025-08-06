import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import { HomeComponent } from './views/home-crud/home-crud.component';

// Produtos
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductReadComponent } from './components/product/product-read/product-read.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';


// Fornecedores
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';

// Clientes
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';

// Pagamentos
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FormaPagamentoUpdateComponent } from './components/formaPagamento/forma-pagamento-update/forma-pagamento-update.component';
import { FormaPagamentoDeleteComponent } from './components/formaPagamento/forma-pagamento-delete/forma-pagamento-delete.component';
import { FormaPagamentoReadComponent } from './components/formaPagamento/forma-pagamento-read/forma-pagamento-read.component';

// Vendas
import { VendaCrudComponent } from './views/venda-crud/venda-crud.component';
import { VendaCreateComponent } from './components/vendas/venda-create/venda-create.component';
import { VendaUpdateComponent } from './components/vendas/venda-update/venda-update.component';
import { VendaDeleteComponent } from './components/vendas/venda-delete/venda-delete.component';
import { VendaReadComponent } from './components/vendas/venda-read/venda-read.component';




// Rotas definidas
const routes: Routes = [
  // Página inicial (Home)
  { path: '', component: HomeComponent },

  // Rotas Produtos
  { path: 'products', component: ProductCrudComponent },
  { path: 'products/create', component: ProductCreateComponent },
  { path: 'products/read/:proId', component: ProductReadComponent },
  { path: 'products/update/:proId', component: ProductUpdateComponent },
  { path: 'products/delete/:proId', component: ProductDeleteComponent },

  // Rotas Fornecedores
  { path: 'fornecedores', component: FornecedorCrudComponent },
  { path: 'fornecedores/create', component: FornecedorCreateComponent },
  { path: 'fornecedores/read/:fornId', component: FornecedorReadComponent },
{ path: 'fornecedores/update/:fornId', component: FornecedorUpdateComponent },
  { path: 'fornecedores/delete/:fornId', component: FornecedorDeleteComponent },

  // Rotas Clientes
  { path: 'cliente', component: ClienteCrudComponent },
  { path: 'cliente/create', component: ClienteCreateComponent },
  { path: 'cliente/read/:cliId', component: ClienteReadComponent },
  { path: 'cliente/update/:cliId', component: ClienteUpdateComponent },
  { path: 'cliente/delete/:cliId', component: ClienteDeleteComponent },

  // Rotas Pagamentos
  { path: 'fpagamentos', component: FormaPagamentoCrudComponent },
  { path: 'fpagamentos/create', component: FormaPagamentoCreateComponent },
  { path: 'fpagamentos/update/:fpgId', component: FormaPagamentoUpdateComponent },
  { path: 'fpagamentos/delete/:fpgId', component: FormaPagamentoDeleteComponent },
  { path: 'fpagamentos/read/:fpgId', component: FormaPagamentoReadComponent },

// Rotas Vendas
{ path: 'venda', component: VendaCrudComponent },
{ path: 'vendas/create', component: VendaCreateComponent },
{ path: 'vendas/read', component: VendaReadComponent },         // Rota para listar todas as vendas
{ path: 'vendas/update/:vendaId', component: VendaUpdateComponent },
{ path: 'vendas/delete/:vendaId', component: VendaDeleteComponent },



  // Rota curinga - redireciona para home caso não encontre rota
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
