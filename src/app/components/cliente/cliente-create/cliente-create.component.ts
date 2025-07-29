import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Cliente {
  cliNome: string;
  cliCpf: string;
  cliDataNascimento: Date | null;
  cliTelefone: string;
  cliEmail: string;
  cliSexo: string;  // adiciona cliSexo aqui, obrigatório
}

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    cliNome: '',
    cliCpf: '',
    cliDataNascimento: null,
    cliTelefone: '',
    cliEmail: '',
    cliSexo: '',  // inicializado vazio, o select deve escolher depois
  };

  cep: string = '';
  numeroResidencia: string = '';
  endereco: any = null;  // objeto retornado da API ViaCEP
  mostrarEndereco: boolean = false;
  cepInvalido: boolean = false;

  maxDate = new Date(); // data máxima para nascimento (hoje)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  capitalizeFirst(fieldName: string) {
    if (fieldName === 'cliNome' && this.cliente.cliNome) {
      this.cliente.cliNome = this.cliente.cliNome.replace(/\b\w/g, c => c.toUpperCase());
    }
  }

  mascaraCpf() {
    let v = this.cliente.cliCpf.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.cliente.cliCpf = v;
  }

  mascaraTelefone() {
    let v = this.cliente.cliTelefone.replace(/\D/g, '');
    if (v.length > 10) {
      v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
    this.cliente.cliTelefone = v;
  }

  apenasNumeros(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  apenasNumerosComMascaraCep(event: KeyboardEvent) {
    const allowedChars = '0123456789-';
    if (!allowedChars.includes(event.key)) {
      event.preventDefault();
    }
  }

  onCepInput() {
    const cepSomenteNumeros = this.cep.replace(/\D/g, '');
    if (cepSomenteNumeros.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cepSomenteNumeros}/json/`).subscribe({
        next: (data: any) => {
          if (data.erro) {
            this.cepInvalido = true;
            this.mostrarEndereco = false;
            this.endereco = null;
          } else {
            this.cepInvalido = false;
            this.mostrarEndereco = true;
            this.endereco = data;
          }
        },
        error: () => {
          this.cepInvalido = true;
          this.mostrarEndereco = false;
          this.endereco = null;
        }
      });
    } else {
      this.cepInvalido = false;
      this.mostrarEndereco = false;
      this.endereco = null;
    }
  }

  salvar() {
    if (
      this.cliente.cliNome && this.cliente.cliCpf && this.cliente.cliDataNascimento &&
      this.cliente.cliTelefone && this.cliente.cliEmail && this.cliente.cliSexo && // valendo cliSexo
      this.cep && this.mostrarEndereco &&
      this.endereco.uf && this.endereco.localidade && this.endereco.logradouro &&
      this.numeroResidencia
    ) {
      console.log('Cliente salvo:', {
        ...this.cliente,
        endereco: {
          cep: this.cep,
          uf: this.endereco.uf,
          localidade: this.endereco.localidade,
          logradouro: this.endereco.logradouro,
          numero: this.numeroResidencia,
          pais: 'Brasil'
        }
      });
      alert('Cliente salvo com sucesso!');
      this.limpar();
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cancel() {
    if (confirm('Deseja cancelar o cadastro? Todas as informações serão perdidas.')) {
      this.limpar();
    }
  }

  limpar(form?: any) {
    this.cliente = {
      cliNome: '',
      cliCpf: '',
      cliDataNascimento: null,
      cliTelefone: '',
      cliEmail: '',
      cliSexo: '',  // limpa cliSexo também
    };
    this.cep = '';
    this.endereco = null;
    this.mostrarEndereco = false;
    this.cepInvalido = false;
    this.numeroResidencia = '';
    if (form) form.resetForm();
  }
}
