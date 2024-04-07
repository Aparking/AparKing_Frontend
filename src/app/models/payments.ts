import { User } from "./authentication";

export interface Plan {
    id: string;
    name: string;
    price: string; // Asegúrate de que esta propiedad está declarada
}

export enum MembershipType {
    FREE = 'Gratuita',
    NOBLE = 'Noble',
    KING = 'King'
}
export interface Membership {
    type: MembershipType
}

export interface Credit {
    value: number
}

export interface CombinedDataPayment {
    user: User;
    membership: Membership;
    credit: Credit;
}