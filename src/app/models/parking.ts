import { Vehicle } from './authentication';

export interface Location {
  latitude: number;
  longitude: number;
  quantity?: number;
}

export enum ParkingType {
  ASSIGNMENT = 'Cesión',
  FREE = 'Libre',
  PRIVATE = 'Privado',
}

export enum ParkingSize {
  BERLINA = 'Berlina',
  COMPACTO = 'Compacto',
  SEDAN = 'Sedan',
  FURGONETA = 'Furgoneta',
  SUV = 'SUV',
}

export interface ParkingCreate {
  parking_types: string[];
  parking_sizes: string[];
}

export enum NotificationsSocket {
  PARKING_DELETED = 'notify.parking.deleted',
  PARKING_BOOKED = 'notify.parking.booked',
  PARKING_NOTIFIED = 'notify.parking.created',
}

export interface ParkingSocket {
  message: Parking;
  type: NotificationsSocket;
}

export interface ParkingResponse {
  parkingData: Parking[];
  group: string;
}

export interface Parking {
  id: number;
  notified_by: number;
  booked_by: number;
  message: number;
  location: Location;
  size: ParkingSize;
  is_assignment: boolean;
  isTransfer: boolean;
  parking_type: ParkingType;
  created_at?: Date;
  updated_at?: Date;
  cesion_parking?: Date;
}
export interface CesionParking {
  parking: [Parking, Vehicle][];
}

export interface City {
  id: number;
  name: string;
  name_ascii?: string | null;
  alternative_name?: string | null;
  location: Location;
  country_code?: string | null;
  distance?: string;
}
