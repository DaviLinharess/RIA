import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface Item { id: number;
                  nome: string;
                  valor: number;
                  ativo: boolean;
                }

@Component({
  selector: 'app-perfume-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './perfume-detail.html'
})
export class PerfumeDetailComponent {
  perfume = input<Item | null>(null);
  fecharEvent = output<void>();
}
