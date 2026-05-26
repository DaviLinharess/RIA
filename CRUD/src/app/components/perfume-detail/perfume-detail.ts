import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNG
import { ButtonModule } from 'primeng/button';

interface Item {
  id: number;
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
  // Input que recebe o perfume selecionado
  perfume = input<Item | null>(null);

  // Output que avisa ao pai que o painel foi fechado
  fecharEvent = output<void>();
}
