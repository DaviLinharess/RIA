import { Component, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';


import { PerfumeService } from '../../services/perfume';

interface PerfumeFormData { nome: string; valor: number | null; ativo: boolean; }

@Component({
  selector: 'app-perfume-form',
  standalone: true,
  imports: [CommonModule, FormField, ButtonModule, InputTextModule, ToggleSwitchModule],
  templateUrl: './perfume-form.html'
})
export class PerfumeFormComponent {
  perfumeModel = signal<PerfumeFormData>({ nome: '', valor: null, ativo: true });

  formPerfume = form(this.perfumeModel, (schemaPath) => {
    required(schemaPath.nome, { message: "O nome é obrigatório." });
    minLength(schemaPath.nome, 3, { message: "Mínimo de 3 caracteres." });
    required(schemaPath.valor, { message: "O preço é obrigatório." });
  });

  formInvalido = computed(() => this.formPerfume.nome().invalid() || this.formPerfume.valor().invalid());

  // Injeção do serviço pelo construtor
  constructor(public perfumeService: PerfumeService) {
    effect(() => {
      // Ouve o sinal do serviço
      const item = this.perfumeService.itemSelecionadoParaEditar();
      if (item && this.perfumeService.idSendoEditado() > 0) {
        this.perfumeModel.set({ nome: item.nome, valor: item.valor, ativo: item.ativo });
      }
    });
  }

  submeter() {
    if (this.formInvalido()) return;

    const dados = this.perfumeModel();

    // Garantir que 'valor' seja um number
    this.perfumeService.salvar({
      nome: dados.nome,
      valor: dados.valor ?? 0, // Se for null, assume 0 com segurança
      ativo: dados.ativo
    });

    this.resetForm();
  }

  cancelar() {
    this.perfumeService.limparEdicao();
    this.resetForm();
  }

  resetForm() {
    this.perfumeModel.set({ nome: '', valor: null, ativo: true });
  }
}
