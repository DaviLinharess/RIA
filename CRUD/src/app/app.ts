import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';               // loops e condicionais

import { form, FormField, required, minLength } from '@angular/forms/signals';

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

// Interface pro Signal do Formulário
interface PerfumeFormData {
  nome: string;
  valor: number | null;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormField,
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
  // Lista de perfumes cadastrados na tabela
  itens = signal<Item[]>([
    { id: 1, nome: 'Natura Homem Sagaz', valor: 189.90, ativo: true },
    { id: 2, nome: 'Natura Kaiak Aero', valor: 154.00, ativo: false }
  ]);

  idSendoEditado = signal<number>(0);

  // 1.  O sinal que armazena os dados iniciais do formulário
  perfumeModel = signal<PerfumeFormData>({
    nome: '',
    valor: null,
    ativo: true,
  });

  // 2. O SIGNAL FORM: Árvore de campos com as validações via schemaPath
  formPerfume = form(this.perfumeModel, (schemaPath) => {
    required(schemaPath.nome, { message: "O nome do produto é obrigatório." });
    minLength(schemaPath.nome, 3, { message: "O nome deve conter pelo menos 3 caracteres." });

    required(schemaPath.valor, { message: "O preço do perfume é obrigatório." });
  });

  // 3. SIGNAL COMPUTADO: deriva a validade a partir dos estados individuais de cada campo
  formInvalido = computed(() => {
    return this.formPerfume.nome().invalid() || this.formPerfume.valor().invalid();
  });

  adicionarItem() {
    // Impede o envio se o sinal computado indicar que há erros
    if (this.formInvalido()) {
      return;
    }

    const dadosDoForm = this.perfumeModel();

    if (this.idSendoEditado() > 0) {
      // Modo Alterar usando a mutação controlada de sinal .update()
      this.itens.update(lista => lista.map(item =>
        item.id === this.idSendoEditado()
          ? { id: item.id, nome: dadosDoForm.nome, valor: dadosDoForm.valor ?? 0, ativo: dadosDoForm.ativo }
          : item
      ));
    } else {
      // Modo Incluir
      const novoId = this.itens().length > 0
        ? Math.max(...this.itens().map(i => i.id)) + 1
        : 1;

      this.itens.update(lista => [...lista, {
        id: novoId,
        nome: dadosDoForm.nome,
        valor: dadosDoForm.valor ?? 0,
        ativo: dadosDoForm.ativo
      }]);
    }

    this.resetForm();
  }

  removerItem(id: number) {
    this.itens.update(lista => lista.filter(item => item.id !== id));
    if (this.idSendoEditado() === id) {
      this.resetForm();
    }
  }

  prepararEdicao(item: Item) {
    this.idSendoEditado.set(item.id);

    // Atualiza o Signal e a árvore do formulário reflete as mudanças
    this.perfumeModel.set({
      nome: item.nome,
      valor: item.valor,
      ativo: item.ativo
    });
  }

  resetForm() {
    this.idSendoEditado.set(0);
    this.perfumeModel.set({
      nome: '',
      valor: null,
      ativo: true
    });
  }
}
