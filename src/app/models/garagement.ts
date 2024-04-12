export interface Address {
  id: number | string;
  street_number: string;
  unit_number: string | null;
  address_line: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
}

export interface Garage {
  filter(arg0: (allGarages: any) => any): any;
  id: number | string;
  name: string;
  description: string;
  height: number;
  width: number;
  length: number;
  price: number;
  creation_date: string;
  modification_date: string;
  is_active: boolean;
  owner: number | string;
  address: Address;
}

export interface Image {
  id: number | string;
  image: string;
  alt: string;
  publication_date: string;
  garage: number | string;
}

export enum GarageStatus {
  AVAILABLE = 'Disponible',
  NOTAVAILABLE = 'No disponible',
  RESERVED = 'Reservado',
}

export interface Availability {
  id: number | string;
  startDate: string;
  endDate: string;
  status: GarageStatus;
  garageId: number | string;
}

export enum PaymentMethod {
  CASH = 'Efectivo',
  CARD = 'Tarjeta',
}

export enum BookingStatus {
  PENDING = 'Pendiente',
  CONFIRMED = 'Confirmada',
  CANCELLED = 'Cancelada',
}

export interface Book {
  id: number | string;
  payment_method: PaymentMethod;
  status: BookingStatus;
  user: number | string;
  availability: number | string;
}
