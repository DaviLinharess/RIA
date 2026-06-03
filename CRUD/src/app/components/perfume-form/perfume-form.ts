import { Component, input, output, model, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, minLength } from '@angular/forms/signals';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { PerfumeService } from '../../services/perfume';

interface Item { id: number;
                nome: string;
                valor: number;
                ativo: boolean;
              }
interface PerfumeFormData { nome: string;
                            valor: number | null;
                            ativo: boolean;
                          }

@Component({
  selector: 'app-perfume-form',
  standalone: true,
  imports: [CommonModule, FormField, ButtonModule, InputTextModule, ToggleSwitchModule],
  templateUrl: './perfume-form.html'
})
export class PerfumeFormComponent {
  idSendoEditado = model<number>(0);
  itemParaEditar = input<Item | null>(null);
  onSalvarSucesso = output<void>();

  perfumeModel = signal<PerfumeFormData>({ nome: '', valor: null, ativo: true });

  formPerfume = form(this.perfumeModel, (schemaPath) => {
    required(schemaPath.nome, { message: "O nome é obrigatório." });
    minLength(schemaPath.nome, 3, { message: "Mínimo de 3 caracteres." });
    required(schemaPath.valor, { message: "O preço é obrigatório." });
  });

  formInvalido = computed(() => this.formPerfume.nome().invalid() || this.formPerfume.valor().invalid());

  constructor(private perfumeService: PerfumeService) {
    effect(() => {
      const item = this.itemParaEditar();
      if (item && this.idSendoEditado() > 0) {
        this.perfumeModel.set({ nome: item.nome, valor: item.valor, ativo: item.ativo });
      }
    });
  }

  submeter() {
    if (this.formInvalido()) return;
    const dados = this.perfumeModel();
    const id = this.idSendoEditado();

    if (id > 0) {
      this.perfumeService.atualizar(id, { nome: dados.nome, valor: dados.valor ?? 0, ativo: dados.ativo });
    } else {
      this.perfumeService.inserir({ nome: dados.nome, valor: dados.valor ?? 0, ativo: dados.ativo });
    }

    this.onSalvarSucesso.emit();
    this.resetForm();
  }

  cancelar() {
    this.idSendoEditado.set(0);
    this.resetForm();
  }

  resetForm() {
    this.perfumeModel.set({ nome: '', valor: null, ativo: true });
  }
}
