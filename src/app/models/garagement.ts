export interface Address {
    streetNumber: string;
    unitNumber: string | null;
    addressLine: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
}

export interface Garage {
    id: number | string;
    name: string;
    description: string;
    height: number;
    width: number;
    length: number;
    price: number;
    creationDate: string;
    modificationDate: string;
    isActive: boolean;
    ownerId: number | string;
    addressId: number | string;
}

export interface Image {
    imageUrl: string;
    alt: string;
    publicationDate: string;
    garageId: number | string;
}
  
export enum GarageStatus {
    AVAILABLE = "Disponible",
    NOTAVAILABLE = "No disponible",
    RESERVED = "Reservado"
}

export interface Availability {
    startDate: string;
    endDate: string;
    status: GarageStatus;
    garageId: number | string;
}