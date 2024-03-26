import { Injectable } from '@angular/core';
import { constants } from '../constants.ts';
import { Token } from '../models/authentication';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor() {}

  public getValue(key: string): any {
    let localValue: any = localStorage.getItem(key);
    try {
      localValue = JSON.parse(localValue);
    } catch (error) {
      console.error(error);
    }
    return localValue;
  }

  public setValue(key: string, value: any): void {
    let localValue = null;
    if (typeof value === 'object') {
      try {
        localValue = JSON.stringify(value);
      } catch (error) {
        localValue = value;
      }
    } else {
      localValue = value;
    }
    return localStorage.setItem(key, localValue);
  }

  public removeValue(key: string): void {
    return localStorage.removeItem(key);
  }

  public resetValues(): void {
    localStorage.clear();
  }

  public getToken(): Token | null {
    let token: Token | null = null;
    let value: any = this.getValue(constants.TOKEN);
    if (value) {
      token = value;
    }
    return token;
  }

  public setToken(token: Token): void {
    this.setValue(constants.TOKEN, token);
  }

  public checkValue(key: string): boolean {
    let res: boolean = false;
    let value: any = localStorage.getItem(key);
    if (value) {
      res = true;
    }
    return res;
  }
}
