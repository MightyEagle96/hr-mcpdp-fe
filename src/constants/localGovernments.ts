import lgas from "./nigeria_lga.json";
export interface LocalGovernment {
  //readonly id: number;
  readonly stateId: number;

  readonly zoneId: number;
  readonly name: string;
}

export const localGovernments: LocalGovernment[] = lgas;
