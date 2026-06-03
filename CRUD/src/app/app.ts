import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';

import { PerfumeFormComponent } from './components/perfume-form/perfume-form';
import { PerfumeListComponent } from './components/perfume-list/perfume-list';
import { PerfumeDetailComponent } from './components/perfume-detail/perfume-detail';

interface Item { id: number;
                nome: string;
                valor: number;
                ativo: boolean;
               }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardModule, PerfumeFormComponent, PerfumeListComponent, PerfumeDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  idSendoEditado = signal<number>(0);
  itemSelecionadoParaEditar = signal<Item | null>(null);
  itemSelecionadoParaDetalhar = signal<Item | null>(null);

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
