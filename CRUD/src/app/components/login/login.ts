import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { AuthService, Credentials } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: 'login.html'
})
export class LoginComponent {
  username = '';
  password = '';
  erroMensagem = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {}

  realizarLogin() {
    this.erroMensagem.set(null);

    const credentials: Credentials = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        // redireciona para a raiz após o login com sucesso
        this.router.navigate(['/']);
      },
      error: () => {
        this.erroMensagem.set('Usuário ou senha inválidos. Tente novamente.');
      }
    });
  }
}
