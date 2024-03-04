import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  public getValue(key: string): any {
    let localValue: any = localStorage.getItem(key);
    try {
      localValue = JSON.parse(localValue);
    } catch (error) {
        localValue = localValue;
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

  public resetValues(): void {
    localStorage.clear();  
  }

  public checkValue(key: string): boolean {
    let res: boolean = false;
    let value: any = localStorage.getItem(key);
    if(value) {
      res = true;
    } 
    return res;
    
  }
}
