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
  birthDate: Date;
  gender: Gender;
  phone: PhoneNumber;
}
