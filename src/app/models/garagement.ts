export interface Address {
  id: string;
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
  id: string;
  name: string;
  description: string;
  height: number;
  width: number;
  length: number;
  price: number;
  creation_date: string;
  modification_date: string;
  is_active: boolean;
  owner: string;
  address: Address;
  image: string;
}

export interface Image {
  id: string;
  image: string;
  alt: string;
  publication_date: string;
  garage: string;
}

// export enum GarageStatus {
//   AVAILABLE = 'Disponible',
//   NOTAVAILABLE = 'No disponible',
//   RESERVED = 'Reservado',
// }

export interface Availability {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  garageId: string;
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
  id: string;
  payment_method: PaymentMethod;
  status: BookingStatus;
  user: string;
  availability: string;
}
