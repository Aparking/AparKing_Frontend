import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsProviderService {
  constructor() {}

  public convertToColorEnum<T>(
    enumType: T,
    str: string
  ): T[keyof T] | undefined {
    return enumType[str as keyof T];
  }
}
