import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CardService } from '../../services/card';
import { TipoCarta, ClasseCarta } from '../../models/card.model';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './card-form.html',
  styleUrls: ['./card-form.less']
})
export class CardFormComponent implements OnInit {
  cardForm!: FormGroup;
  isEditMode = false;
  cardIdEdit?: number;

  tipos = Object.values(TipoCarta);
  classes = Object.values(ClasseCarta);

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      ataque: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      defesa: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      tipo: [TipoCarta.Criatura, Validators.required],
      classe: [ClasseCarta.Qualquer, Validators.required],
      mana: [0, [Validators.min(0), Validators.max(10)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.cardIdEdit = Number(idParam);
      this.carregarDadosEdicao();
    }
  }

  carregarDadosEdicao(): void {
    const cards = this.cardService.getCards();
    const card = cards.find(c => c.id === this.cardIdEdit);
    
    if (card) {
      this.cardForm.patchValue(card); 
    } else {
      this.router.navigate(['/cards']); 
    }
  }

  salvar(): void {
    if (this.cardForm.valid) {
      const cardData = this.cardForm.value;
      
      if (this.isEditMode && this.cardIdEdit) {
        cardData.id = this.cardIdEdit;
      }
      

      this.cardService.saveCard(cardData);
      this.router.navigate(['/cards']);
    } else {
      this.cardForm.markAllAsTouched(); 
    }
  }
}