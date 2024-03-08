import { User } from './authentication';

export interface Location {
  latitude: number;
  longitude: number;
}

export enum ParkingType {
  ASSIGNMENT = 'ASSIGNMENT',
  FREE = 'FREE',
  PRIVATE = 'PRIVATE',
}

export enum ParkingSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum NotificationsSocket {
  PARKING_DELETED = 'notify.parking.deleted',
  PARKING_BOOKED = 'notify.parking.booked',
  PARKING_NOTIFIED = 'notify.parking.created',
}

export interface ParkingResponse {
  parkingData: Parking[];
  group: string;
}

export interface Parking {
  id: number;
  notified_by: User;
  bookedBy: User | null;
  message: string | null;
  location: Location;
  size: ParkingSize;
  is_assignment: boolean;
  isTransfer: boolean;
  parking_type: ParkingType;
  createdAt: Date;
  updatedAt: Date;
}