import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface Item {
  id: number;
  nome: string;
  valor: number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {
  // porta do django (8000) e url do codespace
  private apiUrl = 'https://symmetrical-guide-q7pxpq9vqp7rc49rq-8000.app.github.dev/perfumes/';

  itens = signal<Item[]>([]);

  constructor(private http: HttpClient) {}

  // listar (get) em localhost:8000/perfumes/
  listar() {
    this.http.get<Item[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('Erro na requisição GET:', error);
          return throwError(() => new Error('Não foi possível buscar os dados do servidor.'));
        })
      )
      .subscribe(dados => this.itens.set(dados));
  }

  // detalhar (get por id) em localhost:8000/perfumes/id/
  buscarPorId(id: number) {
    return this.http.get<Item>(`${this.apiUrl}${id}/`).pipe(
      catchError(error => {
        console.error('Erro ao buscar item específico:', error);
        return throwError(() => new Error('Produto não localizado no servidor.'));
      })
    );
  }

  // inserir (post) em localhost:8000/perfumes/
  inserir(dados: { nome: string; valor: number; ativo: boolean }) {
    this.http.post<Item>(this.apiUrl, dados)
      .pipe(
        catchError(error => {
          console.error('Erro na inserção POST:', error);
          return throwError(() => new Error('Falha ao registrar novo produto.'));
        })
      )
      .subscribe(() => this.listar());
  }

  // atualizar (put) em localhost:8000/perfumes/id/
  atualizar(id: number, dados: { nome: string; valor: number; ativo: boolean }) {
    this.http.put<Item>(`${this.apiUrl}${id}/`, dados)
      .pipe(
        catchError(error => {
          console.error('Erro na atualização PUT:', error);
          return throwError(() => new Error('Falha ao salvar modificações.'));
        })
      )
      .subscribe(() => this.listar());
  }

  // remover (delete) em localhost:8000/perfumes/id/
  remover(id: number) {
    this.http.delete(`${this.apiUrl}${id}/`)
      .pipe(
        catchError(error => {
          console.error('Erro na remoção DELETE:', error);
          return throwError(() => new Error('Não foi possível excluir o item do servidor.'));
        })
      )
      .subscribe(() => this.listar());
  }
}
