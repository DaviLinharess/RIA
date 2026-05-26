import { Component, input, output, model, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, minLength } from '@angular/forms/signals';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}

interface PerfumeFormData {
  nome: string;
  valor: number | null;
  ativo: boolean;
}

@Component({
  selector: 'app-perfume-form',
  standalone: true,
  imports: [
    CommonModule,
    FormField,
    ButtonModule,
    InputTextModule,
    ToggleSwitchModule
  ],
  templateUrl: './perfume-form.html'
})
export class PerfumeFormComponent {
  // model() cria um canal Two-way data binding com o pai
  idSendoEditado = model<number>(0);

  // input() para receber qual perfume o usuário clicou para editar
  itemParaEditar = input<Item | null>(null);

  // output() para despachar os dados validados de volta para o componente pai
  salvarEvent = output<{ nome: string; valor: number; ativo: boolean }>();

  // O Model Signal que armazena os dados primitivos do formulário
  perfumeModel = signal<PerfumeFormData>({
    nome: '',
    valor: null,
    ativo: true,
  });

  // Árvore do Signal Form com regras via schemaPath
  formPerfume = form(this.perfumeModel, (schemaPath) => {
    required(schemaPath.nome, { message: "O nome do produto é obrigatório." });
    minLength(schemaPath.nome, 3, { message: "O nome deve conter pelo menos 3 caracteres." });
    required(schemaPath.valor, { message: "O preço do perfume é obrigatório." });
  });

  // Signal Computado para travar/liberar o botão
  formInvalido = computed(() => {
    return this.formPerfume.nome().invalid() || this.formPerfume.valor().invalid();
  });

  constructor() {
    // Usando effect() para reagir a mudanças no input reativo
    effect(() => {
      const item = this.itemParaEditar();
      if (item && this.idSendoEditado() > 0) {
        this.perfumeModel.set({
          nome: item.nome,
          valor: item.valor,
          ativo: item.ativo
        });
      }
    });
  }

  submeter() {
    if (this.formInvalido()) return;

    const dados = this.perfumeModel();
    // Emite o evento pro pai salvar no "banco"
    this.salvarEvent.emit({
      nome: dados.nome,
      valor: dados.valor ?? 0,
      ativo: dados.ativo
    });

    this.resetForm();
  }

  cancelar() {
    this.idSendoEditado.set(0);
    this.resetForm();
  }

  resetForm() {
    this.perfumeModel.set({
      nome: '',
      valor: null,
      ativo: true
    });
  }
}
