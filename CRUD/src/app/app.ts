import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';               //loops e condicionais
import { FormsModule } from '@angular/forms';                 // forms (inputs)

//Imports do PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';    //booleano bonito
import { CardModule } from 'primeng/card';


// Interface
interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    ToggleSwitchModule,
    CardModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Lista de itens usando Signal (Reatividade nativa)
  itens = signal<Item[]>([
    { id: 1, nome: 'Exemplo de Item', valor: 99.90, ativo: true }
  ]);

  // Objeto para o formulário (Two-way data binding)
  novoItem: Item = { id: 0, nome: '', valor: 0, ativo: true};

  // Operação: Incluir
  adicionar() {
    if (this.novoItem.nome) {
      const listaAtual = this.itens();

      if (this.novoItem.id > 0) { // Se o ID for maior que 0, é um item existente

        //  Atualiza o item existente, substituindo o item antigo pelo novo na lista
        this.itens.update(lista => lista.map(i => i.id === this.novoItem.id ? { ...this.novoItem } : i));

      } else {
        // Gerar um novo ID para o item
        const novoId = listaAtual.length > 0                  // se a lista estiver vazia, o ID é 1
      ? Math.max(...listaAtual.map(item => item.id)) + 1      // se não, busca o maior ID existente e soma +1
      : 1;
                                                              // atualiza o Signal criando uma nova lista
      this.itens.update(lista => [...lista, {...this.novoItem, id: novoId }]);
      }

      this.resetForm();
    }
  }

  // Operação: Remover
  remover(id: number) {
                                                            // se o ID desse item for DIFERENTE do ID que mandei como param,
                                                            // ele continua na lista. Se for IGUAl, será "filtrado" para fora
    this.itens.update(lista => lista.filter(item => item.id !== id));
  }

  resetForm() {
    this.novoItem = { id: 0, nome: '', valor: 0, ativo: true };
  }

  prepararEdicao(item: Item) {
    this.novoItem = {...item};                              // Clona o item para evitar complicações diretas
  }

  protected readonly title = signal('CRUD');
}
