import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// HTTP Client
import { HttpClientModule } from '@angular/common/http';

// Angular core modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Localization (Portuguese - Brasil)
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

// Routing module
import { AppRoutingModule } from './app-routing.module';

// Component imports
import { AppComponent } from './app.component';

// Template components
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

// Views
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { FormaPagamentoCrudComponent } from './views/forma-pagamento-crud/forma-pagamento-crud.component';
import { ClienteCrudComponent } from './views/cliente-crud/cliente-crud.component';
import { EstoqueCrudComponent } from './views/estoque-crud/estoque-crud.component';
import { FornecedorCrudComponent } from './views/fornecedor-crud/fornecedor-crud.component';

// Product Components
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { ProductReadComponent } from './components/product/product-read/product-read.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';

// FormaPagamento Components
import { FormaPagamentoReadComponent } from './components/formaPagamento/forma-pagamento-read/forma-pagamento-read.component';
import { FormaPagamentoCreateComponent } from './components/formaPagamento/forma-pagamento-create/forma-pagamento-create.component';
import { FormaPagamentoUpdateComponent } from './components/formaPagamento/forma-pagamento-update/forma-pagamento-update.component';
import { FormaPagamentoDeleteComponent } from './components/formaPagamento/forma-pagamento-delete/forma-pagamento-delete.component';

// Cliente Components
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteReadComponent } from './components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';

// Estoque Components
import { EstoqueCreateComponent } from './components/estoque/estoque-create/estoque-create.component';
import { EstoqueReadComponent } from './components/estoque/estoque-read/estoque-read.component';
import { EstoqueUpdateComponent } from './components/estoque/estoque-update/estoque-update.component';
import { EstoqueDeleteComponent } from './components/estoque/estoque-delete/estoque-delete.component';

// Fornecedor Components
import { FornecedorCreateComponent } from './components/fornecedor/fornecedor-create/fornecedor-create.component';
import { FornecedorReadComponent } from './components/fornecedor/fornecedor-read/fornecedor-read.component';
import { FornecedorUpdateComponent } from './components/fornecedor/fornecedor-update/fornecedor-update.component';
import { FornecedorDeleteComponent } from './components/fornecedor/fornecedor-delete/fornecedor-delete.component';

// Outros componentes variados
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { RelatoriosComponent } from './components/relatorios/relatorios.component';
import { FornecedoresComponent } from './components/fornecedores/fornecedores.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { AgendamentoComponent } from './components/agendamentos/agendamento/agendamento.component';
import { PerfilComponent } from './components/perfil/perfil.component';

// Diretivas
import { RedDirective } from './directives/red.directive';

@NgModule({
  declarations: [
    // Componente principal da aplicação
    AppComponent,

    // Template (componentes de layout)
    HeaderComponent,
    FooterComponent,
    NavComponent,

    // Views principais
    HomeComponent,
    ProductCrudComponent,
    FormaPagamentoCrudComponent,
    ClienteCrudComponent,
    EstoqueCrudComponent,
    FornecedorCrudComponent,

    // Componentes do módulo Produto
    ProductCreateComponent,
    ProductReadComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,

    // Componentes do módulo FormaPagamento
    FormaPagamentoReadComponent,
    FormaPagamentoCreateComponent,
    FormaPagamentoUpdateComponent,
    FormaPagamentoDeleteComponent,

    // Componentes do módulo Cliente
    ClienteCreateComponent,
    ClienteReadComponent,
    ClienteUpdateComponent,
    ClienteDeleteComponent,

    // Componentes do módulo Estoque
    EstoqueCreateComponent,
    EstoqueReadComponent,
    EstoqueUpdateComponent,
    EstoqueDeleteComponent,

    // Componentes do módulo Fornecedor
    FornecedorCreateComponent,
    FornecedorReadComponent,
    FornecedorUpdateComponent,
    FornecedorDeleteComponent,

    // Outros componentes
    AjustesComponent,
    RelatoriosComponent,
    FornecedoresComponent,
    AgendamentosComponent,
    AgendamentoComponent,
    PerfilComponent,

    // Diretivas personalizadas
    RedDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Angular Material Modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,

    // Forms Modules
    FormsModule,
    ReactiveFormsModule,
    

    // HTTP Client
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR' // Define a localidade para pt-BR (Português do Brasil)
    }
  ],
  bootstrap: [AppComponent] // Componente raiz para bootstrap
})
export class AppModule { }
