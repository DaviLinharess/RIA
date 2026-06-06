import { Routes } from '@angular/router';
import { PerfumeListComponent } from './components/perfume-list/perfume-list';
import { PerfumeFormComponent } from './components/perfume-form/perfume-form';
import { PerfumeDetailComponent } from './components/perfume-detail/perfume-detail';

export const routes: Routes = [
  { path: '', component: PerfumeListComponent },  // raiz que mostra a lista

  { path: 'perfumes/incluir', component: PerfumeFormComponent }, // inclusão

  { path: 'perfumes/editar/:id', component: PerfumeFormComponent },    // editar
  { path: 'perfumes/detalhe/:id', component: PerfumeDetailComponent }, // detalhe

  { path: '**', redirectTo: '' } // rota "coringa" pra caminhos inexistentes até a raiz
]
