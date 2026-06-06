import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { form, FormField, required, minLength } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';

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
export class PerfumeFormComponent implements OnInit {
  idSendoEditado = signal<number>(0);

  perfumeModel = signal<PerfumeFormData>({ nome: '', valor: null, ativo: true });

  formPerfume = form(this.perfumeModel, (schemaPath) => {
    required(schemaPath.nome, { message: "O nome é obrigatório." });
    minLength(schemaPath.nome, 3, { message: "Mínimo de 3 caracteres." });
    required(schemaPath.valor, { message: "O preço é obrigatório." });
  });

  formInvalido = computed(() => this.formPerfume.nome().invalid() || this.formPerfume.valor().invalid());

  constructor(
    private perfumeService: PerfumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {   // Pega a informação enviada pela rota usando paramMap
      const idParam = params.get('id');

      if (idParam) {
        const id = Number(idParam);
        this.idSendoEditado.set(id);

        // procura o perfume dentro da lista do service
        const itemParaEditar = this.perfumeService.itens().find(p => p.id === id);

        if (itemParaEditar) {
          this.perfumeModel.set({
            nome: itemParaEditar.nome,
            valor: itemParaEditar.valor,
            ativo: itemParaEditar.ativo
          });
        }
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

    // depois de salvar, volta pra listagem (rota padrão)
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
