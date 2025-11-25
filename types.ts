export enum PrizeType {
  MOUSEPAD = 'MOUSEPAD',
  AUDIO_INTERFACE = 'AUDIO_INTERFACE'
}

export interface ParticipantGroup {
  prize: PrizeType;
  prizeName: string;
  members: string[];
  description: string;
  color: string;
  imageAlt: string;
}

export type ViewState = 'SELECTION' | 'ANIMATING' | 'RESULT';