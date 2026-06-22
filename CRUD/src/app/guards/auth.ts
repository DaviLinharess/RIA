import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth';

// guarda de rota baseado na API CanActivateFn do Angular
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado()) {
    return true; // acesso liberado
  }

  // se não estiver logado, redireciona o usuário de volta para a tela de login
  router.navigate(['/login']);
  return false;
};
