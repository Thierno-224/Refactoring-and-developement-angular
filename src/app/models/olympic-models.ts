export interface ParticipationModel {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}

export interface OlympicModel {
  id: number;
  country: string;
  participations: ParticipationModel[];
}
