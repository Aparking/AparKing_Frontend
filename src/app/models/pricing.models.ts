import { BackendUser } from "src/app/models/user.models";

export enum MemberType {
  FREE = 'Gratuita',
  NOBLE = 'Noble',
  KING = 'King'
}

export interface MemberShip {
  start_date?: Date;
  end_date?: Date;
  type: MemberType;
  user: BackendUser;
  price: number;
}
