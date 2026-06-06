import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { Router } from '@angular/router';
import { PerfumeService, Item } from '../../services/perfume';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './perfume-list.html'
})
export class PerfumeListComponent {
  constructor(
    public perfumeService: PerfumeService,
    private router: Router
  ) {}

  irParaIncluir() {
    this.router.navigate(['/perfumes/incluir']);
  }

  irParaEditar(item: Item) {
    this.router.navigate(['/perfumes/editar', item.id]);
  }

  irParaDetalhar(item: Item) {
    this.router.navigate(['/perfumes/detalhe', item.id]);
  }

  deletar(id: number) {
    this.perfumeService.remover(id);
  }
}
