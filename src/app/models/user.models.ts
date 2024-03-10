export interface BackendUser {
  username: string;
  password: string;
  email: string;
  dni: string;
  birth_date: any;
  gender: string;
  photo?: string;
  phone: string;
}
export interface User {
    id?: number;
    username?: string;
    email?: string;
    dni?: string;
    birth_date?: Date;
    gender?: string;
    photo?: string ;
    phone?: string;
    is_staff?:string;
}

