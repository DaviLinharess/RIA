import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './perfume-list.html'
})
export class PerfumeListComponent {
  // Injeção do serviço para usá-lo direto no template HTML
  constructor(public perfumeService: PerfumeService) {}
}
