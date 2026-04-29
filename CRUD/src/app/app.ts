import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';               // loops e condicionais
import { FormsModule } from '@angular/forms';                 // forms (inputs)

//Imports do PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CardModule } from 'primeng/card';



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
  itens: Item[] = [                                                             // Lista de itens, começa com um exemplo
    {id: 1, nome: 'Exemplo de Item', valor: 99.90, ativo: true}                 // pra mostrar a tabela preenchida.
  ];

  novoItem: Item = {id: 0, nome: '', valor: 0, ativo: true};                    // Objeto para armazenar os dados, começa vazio.

  adicionarItem() {
    if(this.novoItem.nome) {                                                    // Só adiciona se o nome do item não for vazio
      if (this.novoItem.id > 0) {                                               // Já existe, vai ser uma Alteração (Update)
        const index = this.itens.findIndex(i => i.id === this.novoItem.id);     // Percorre "itens" e retorna a posição
                                                                                // do item que tem o mesmo id do "novoItem"
        if (index !== -1) {                                                     // Se "index" não achou o id (retornou -1), não faz nada.
          this.itens[index] = {...this.novoItem};                               // Se achou, atualiza o item naquela posição
        }
      } else {                                                                  // ID não existe, vai ser um Cadastro (Create)
        const novoId = this.itens.length > 0                                    // Se já existe pelo menos um item,
        ? Math.max(...this.itens.map(i => i.id)) + 1                            // o novo ID é o maior ID atual + 1.
        : 1;                                                                    // Se não existe nenhum item, o novo ID é 1.

        const itemParaAdicionar = {...this.novoItem, id: novoId};               // Cria um novo item com os dados do "novoItem" e o "novoId".
        this.itens.push(itemParaAdicionar);                                     // Adiciona na lista de itens.
      }
      this.resetForm();                                                         // Limpa o formulário para o próximo cadastro ou edição.
    }
  }

  removerItem(id: number) {
    this.itens = this.itens.filter(i => i.id !== id);                           // Percorre o array "itens" e cria um novo array
  }                                                                             // que passarem no "filtro": manter todos os ID's
                                                                                // que forem diferentes do ID que quero tirar.

  prepararEdicao(item: Item) {                                                  // Quando clica no botão "editar"
    this.novoItem = {...item};                                                  // Copia os dados do item para "novoItem",
  }                                                                             // agora quando apertar em salvar, o forms vai preenchido
                                                                                // e o método "adicionarItem" vai entender que é uma edição por causa do ID.

  resetForm() {
    this.novoItem = {id: 0, nome: '', valor: 0, ativo: true};                   // Limpa o formulário, voltando "novoItem" para o estado inicial.
  }
}
