import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly STORAGE_KEY = 'hearthstone_cards';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  saveCard(card: Card): void {
    const cards = this.getCards();
    const index = cards.findIndex(c => c.id === card.id);

    if (index > -1) {
      cards[index] = card; 
    } else {
      card.id = new Date().getTime(); 
      cards.push(card); 
    }

    this.updateStorage(cards);
  }

  getCards(): Card[] {
    if (this.isBrowser) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  
  deleteCard(id: number): void {
    let cards = this.getCards();
    cards = cards.filter(c => c.id !== id);
    this.updateStorage(cards);
  }

  searchCards(filtro: { id?: number; nome?: string; classe?: string; tipo?: string }): Card[] {
    let cards = this.getCards();

    if (filtro.id) {
      cards = cards.filter(c => c.id === filtro.id);
    }
    if (filtro.nome) {
      cards = cards.filter(c => c.nome.toLowerCase().includes(filtro.nome!.toLowerCase()));
    }
    if (filtro.classe) {
      cards = cards.filter(c => c.classe === filtro.classe);
    }
    if (filtro.tipo) {
      cards = cards.filter(c => c.tipo === filtro.tipo);
    }

    return cards;
  }

  private updateStorage(cards: Card[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
    }
  }
}