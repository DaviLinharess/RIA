import { Injectable, signal } from '@angular/core';

export interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class PerfumeService {

  itens = signal<Item[]>([
    { id: 1, nome: 'Natura Homem Sagaz', valor: 189.90, ativo: true },
    { id: 2, nome: 'Natura Kaiak Aero', valor: 154.00, ativo: false }
  ]);

  listar() {
    return this.itens();
  }

  inserir(dados: { nome: string; valor: number; ativo: boolean }) {
    const novoId = this.itens().length > 0 ? Math.max(...this.itens().map(i => i.id)) + 1 : 1;
    this.itens.update(lista => [...lista, { id: novoId, ...dados }]);
  }

  atualizar(id: number, dados: { nome: string; valor: number; ativo: boolean }) {
    this.itens.update(lista => lista.map(item =>
      item.id === id ? { id, ...dados } : item
    ));
  }

  remover(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));
  }
}
