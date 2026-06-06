import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { PerfumeService, Item } from '../../services/perfume';

@Component({
  selector: 'app-perfume-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './perfume-detail.html'
})
export class PerfumeDetailComponent implements OnInit {

  perfume = signal<Item | null>(null);

  constructor(
    private perfumeService: PerfumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {   //Pega o ID que veio da URL pra carregar os detalhes
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        const itemencontrado = this.perfumeService.itens().find(p => p.id === id);
        if (itemencontrado) {
          this.perfume.set(itemencontrado);
        }
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
