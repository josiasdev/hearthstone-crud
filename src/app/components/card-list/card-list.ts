import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardService } from '../../services/card';
import { Card, TipoCarta, ClasseCarta } from '../../models/card.model';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './card-list.html',
  styleUrls: ['./card-list.less']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];
  
  filtroId?: number;
  filtroNome: string = '';
  filtroClasse: string = '';
  filtroTipo: string = '';

  tipos = Object.values(TipoCarta);
  classes = Object.values(ClasseCarta);

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.carregarCartas();
  }

  carregarCartas(): void {
    this.cards = this.cardService.getCards();
  }

  pesquisar(): void {
    this.cards = this.cardService.searchCards({
      id: this.filtroId,
      nome: this.filtroNome,
      classe: this.filtroClasse,
      tipo: this.filtroTipo
    });
  }

  limparFiltros(): void {
    this.filtroId = undefined;
    this.filtroNome = '';
    this.filtroClasse = '';
    this.filtroTipo = '';
    this.carregarCartas();
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta carta?')) {
      this.cardService.deleteCard(id);
      this.carregarCartas(); 
    }
  }
}