import { Routes } from '@angular/router';
import { CadastroContatoComponent } from './components/cadastro-contato/cadastro-contato.component';
import { ConsultaContatoComponent } from './components/consulta-contato/consulta-contato.component';
import { ContatoDetalheComponent } from './components/contato-detalhe/contato-detalhe.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroContatoComponent },
  { path: 'consulta', component: ConsultaContatoComponent },
  { path: 'detalhe/id/:id', component: ContatoDetalheComponent },
  { path: '', redirectTo: '/consulta', pathMatch: 'full' },
  { path: '**', redirectTo: '/consulta' },
];
