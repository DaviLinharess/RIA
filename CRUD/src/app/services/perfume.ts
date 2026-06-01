import { Injectable, signal } from '@angular/core';

export interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}


@Injectable({
  providedIn: 'root' // Serviço uma única instância pro app inteiro
})
export class PerfumeService {
  // Substitui os sinais que estavam no App pai
  itens = signal<Item[]>([
    { id: 1, nome: 'Natura Homem Sagaz', valor: 189.90, ativo: true },
    { id: 2, nome: 'Natura Kaiak Aero', valor: 154.00, ativo: false }
  ]);

  idSendoEditado = signal<number>(0);
  itemSelecionadoParaEditar = signal<Item | null>(null);
  itemSelecionadoParaDetalhar = signal<Item | null>(null);

  // Operação LISTAR
  listar() {
    return this.itens();
  }

  // Operações INSERIR / ATUALIZAR
  salvar(dadosForm: { nome: string; valor: number; ativo: boolean }) {
    const id = this.idSendoEditado();

    if (id > 0) {
      // Operação ATUALIZAR
      this.itens.update(lista => lista.map(item =>
        item.id === id ? { id, ...dadosForm } : item
      ));
    } else {
      // Operação INSERIR
      const novoId = this.itens().length > 0 ? Math.max(...this.itens().map(i => i.id)) + 1 : 1;
      this.itens.update(lista => [...lista, { id: novoId, ...dadosForm }]);
    }
    this.limparEdicao();
  }

  // Operação DETALHAR
  detalhar(item: Item) {
    this.itemSelecionadoParaDetalhar.set(item);
  }

  // Operação REMOVER
  remover(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));

    // Limpezas de segurança
    if (this.idSendoEditado() === id) this.limparEdicao();
    if (this.itemSelecionadoParaDetalhar()?.id === id) this.limparDetalhes();
  }

  // Funções auxiliares
  selecionarParaEditar(item: Item) {
    this.idSendoEditado.set(item.id);
    this.itemSelecionadoParaEditar.set(item);
  }

  limparEdicao() {
    this.idSendoEditado.set(0);
    this.itemSelecionadoParaEditar.set(null);
  }

  limparDetalhes() {
    this.itemSelecionadoParaDetalhar.set(null);
  }
}
