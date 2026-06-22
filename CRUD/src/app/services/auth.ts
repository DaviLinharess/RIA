import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs';

export interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://symmetrical-guide-q7pxpq9vqp7rc49rq-8000.app.github.dev/api/token/';

  // token guardado em memória (signal)
  private tokenSignal = signal<string | null>(null);

  // computed signal que informa se o usuário está logado
  isAutenticado = computed(() => this.tokenSignal() !== null);

  constructor(private http: HttpClient, private router: Router) {}

  // retorna o token atual em memória
  obterToken(): string | null {
    return this.tokenSignal();
  }

  login(credentials: Credentials) {
    return this.http.post<{ access: string; refresh: string }>(this.loginUrl, credentials).pipe(
      tap(response => {
        // salva só o token de acesso na memória volatil
        this.tokenSignal.set(response.access);
      })
    );
  }

  logout() {
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }
}
