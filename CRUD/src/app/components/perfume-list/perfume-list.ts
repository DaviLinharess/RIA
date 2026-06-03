import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { PerfumeService, Item } from '../../services/perfume';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './perfume-list.html'
})
export class PerfumeListComponent {
  editarEvent = output<Item>();
  detalharEvent = output<Item>();
  removerEvent = output<number>();

  constructor(public perfumeService: PerfumeService) {}

  deletar(id: number) {
    this.perfumeService.remover(id);
    this.removerEvent.emit(id);
  }
}
