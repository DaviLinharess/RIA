import { Routes } from '@angular/router';
import { PerfumeListComponent } from './components/perfume-list/perfume-list';
import { PerfumeFormComponent } from './components/perfume-form/perfume-form';
import { PerfumeDetailComponent } from './components/perfume-detail/perfume-detail';

import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  // rotas protegidas pelo CanActivate Guard
  { path: '', component: PerfumeListComponent, canActivate: [authGuard] },
  { path: 'perfumes/incluir', component: PerfumeFormComponent, canActivate: [authGuard] },
  { path: 'perfumes/editar/:id', component: PerfumeFormComponent, canActivate: [authGuard] },
  { path: 'perfumes/detalhe/:id', component: PerfumeDetailComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' } // rota coringa
]
