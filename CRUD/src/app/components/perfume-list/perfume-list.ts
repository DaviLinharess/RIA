import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

//PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}

@Component({
  selector: 'app-perfume-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './perfume-list.html'
})

export class PerfumeListComponent {
  // Input baseado em Signal. O ".required" obriga o pai a enviar a lista.
  listaDeItens = input.required<Item[]>();

  // Outputs baseados em Signals para avisar o pai sobre as ações do usuário
  editarEvent = output<Item>();
  removerEvent = output<number>();
  detalharEvent = output<Item>();
}
