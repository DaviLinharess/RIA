import { Component, signal, computed } from '@angular/core';

//Import do PrimeNG
import { CardModule } from 'primeng/card';

// Imports dos componentes criados
import { PerfumeFormComponent } from './components/perfume-form/perfume-form';
import { PerfumeListComponent } from './components/perfume-list/perfume-list';
import { PerfumeDetailComponent } from './components/perfume-detail/perfume-detail';

interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}

// Interface pro Signal do Formulário
interface PerfumeFormData {
  nome: string;
  valor: number | null;
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
  // A lista oficial
  itens = signal<Item[]>([
    { id: 1, nome: 'Natura Homem Sagaz', valor: 189.90, ativo: true },
    { id: 2, nome: 'Natura Kaiak Aero', valor: 154.00, ativo: false }
  ]);

  // Sinais de controle que servem para enviar dados aos filhos
  idSendoEditado = signal<number>(0);
  itemSelecionadoParaEditar = signal<Item | null>(null);
  itemSelecionadoParaDetalhar = signal<Item | null>(null);

  // Quando o componente de formulário faz o "salvar"
  salvarFormulario(dadosForm: { nome: string; valor: number; ativo: boolean }) {
    if (this.idSendoEditado() > 0) {
      // ALTERAR
      this.itens.update(lista => lista.map(item =>
        item.id === this.idSendoEditado()
          ? { id: item.id, ...dadosForm }
          : item
      ));
    } else {
      // INCLUIR
      const novoId = this.itens().length > 0
        ? Math.max(...this.itens().map(i => i.id)) + 1
        : 1;

      this.itens.update(lista => [...lista, { id: novoId, ...dadosForm }]);
    }

    // Limpa os inputs
    this.idSendoEditado.set(0);
    this.itemSelecionadoParaEditar.set(null);
  }

  // Quando o usuário clica no lápis (editar)
  capturarEdicao(item: Item) {
    this.idSendoEditado.set(item.id);
    this.itemSelecionadoParaEditar.set(item);
  }

  // Quando o usuário clica na lixeira (excluir))
  capturarRemocao(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));

    // Se o item deletado estava aberto no formulário ou nos detalhes, limpa a tela
    if (this.idSendoEditado() === id) {
      this.idSendoEditado.set(0);
      this.itemSelecionadoParaEditar.set(null);
    }
    if (this.itemSelecionadoParaDetalhar()?.id === id) {
      this.itemSelecionadoParaDetalhar.set(null);
    }
  }
}
