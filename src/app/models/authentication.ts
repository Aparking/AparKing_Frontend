export enum Gender {
  Male = 'M',
  Female = 'F',
  Other = 'O',
}

export interface PhoneNumber {
  countryCode: string;
  areaCode: string;
  number: string;
}

export interface Token {
  token: string;
}

export interface User {
  id: number;
  email: string;
  dni: string;
  birth_date: Date;
  gender: Gender;
  phone: PhoneNumber;
  username: string;
}

export interface Vehicle {
  carModel: string;
  color: string;
  height?: number | null;
  width?: number | null;
  length?: number | null;
}

