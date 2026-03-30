
export enum TipoCarta {
  Magia = 'Magia',
  Criatura = 'Criatura'
}

export enum ClasseCarta {
  Mago = 'Mago',
  Paladino = 'Paladino',
  Cacador = 'Caçador',
  Druida = 'Druida',
  Qualquer = 'Qualquer'
}

export interface Card {
  id: number;
  nome: string;
  descricao: string;
  ataque: number; 
  defesa: number; 
  tipo: TipoCarta;
  classe: ClasseCarta;
  mana?: number; 
}