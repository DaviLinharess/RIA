import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-perfume-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './perfume-detail.html'
})
export class PerfumeDetailComponent {
  constructor(public perfumeService: PerfumeService) {}
}
