export interface Participant {
    id: number;
    nom: string;
    participantMiahoot: string;
}

export interface Concepteur {
    createdMiahoots: string[];
}

export interface Presentateur {
    createdMiahoots: string[];
}

export interface Response {
    id: number;
    label: string;
    estValide: boolean;
    question: string;
}

export interface Question {
    id?: number;
    label: string;
    miahoot?: string;
    responses?: Response[];
}

export interface Miahoot {
    id?: number;
    concepteur?: Concepteur;
    presentateur?: Presentateur;
    participants?: Participant[];
    nom?: string;
    questions?: Question[];
}

export interface Teacher {
    id?: number;
    nom?: string;
    createdMiahoots?: Miahoot[];
    presentedMiahoots?: Miahoot[];
  }