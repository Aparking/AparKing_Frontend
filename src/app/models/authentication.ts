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
  id?: number;
  carModel: string;
  color: string;
  height: number;
  width: number;
  length: number;
  owner: number;
  principalCar: boolean;
}

