import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

import { PerfumeFormComponent } from './components/perfume-form/perfume-form';
import { PerfumeListComponent } from './components/perfume-list/perfume-list';
import { PerfumeDetailComponent } from './components/perfume-detail/perfume-detail';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardModule, PerfumeFormComponent, PerfumeListComponent, PerfumeDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
