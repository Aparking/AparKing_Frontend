// address.model.ts
export interface Address {
    street_number: string;
    unit_number?: string;
    address_line: string;
    city: string;
    region: string;
    country: string; // Assuming you're using a string for the country code
    postal_code: string;
    locality: string;
  }
  
  // garage.model.ts  
  export interface Garage {
    name: string;
    description: string;
    height: number;
    width: number;
    length: number;
    price: number;
    creation_date: Date;
    modification_date: Date;
    is_active: boolean;
  }
  
  // image.model.ts
  export interface Image {
    image: File; // Assuming you're dealing with file uploads in Angular
    alt: string;
    publication_date: Date;
    garage: number; // Assuming you're using the garage ID as a reference
  }
  
  // availability.model.ts
  export interface Availability {
    start_date: Date;
    end_date: Date;
    status: string; // Use a specific string type or an enum for status
    garage: number; // Assuming you're using the garage ID as a reference
  }
  