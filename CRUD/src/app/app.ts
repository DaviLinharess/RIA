import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { AuthService } from './services/auth';

interface Item { id: number;
                nome: string;
                valor: number;
                ativo: boolean;
               }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  idSendoEditado = signal<number>(0);
  itemSelecionadoParaEditar = signal<Item | null>(null);
  itemSelecionadoParaDetalhar = signal<Item | null>(null);

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  //funções auxiliares
  capturarEdicao(item: Item) {
    this.idSendoEditado.set(item.id);
    this.itemSelecionadoParaEditar.set(item);
  }

  limparEdicao() {
    this.idSendoEditado.set(0);
    this.itemSelecionadoParaEditar.set(null);
  }

  capturarRemocaoNoPai(id: number) {
    if (this.idSendoEditado() === id) this.limparEdicao();
    if (this.itemSelecionadoParaDetalhar()?.id === id) this.itemSelecionadoParaDetalhar.set(null);
  }
}
