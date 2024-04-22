import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WsAbstractService {
  constructor(private http: HttpClient) {}

  protected makeGetRequest(path: string, paramsRequest?: any): Promise<any> {
    paramsRequest = !paramsRequest ? {} : paramsRequest;
    return new Promise((resolve, reject) => {
      this.http.get(path, { params: paramsRequest }).subscribe(
        (data) => {
          resolve(data);
        },
        (err) => {
          if (err == 200) {
            reject(null);
          } else {
            reject(err);
          }
        }
      );
    });
  }

  protected makeDeleteRequest(path: string, paramsRequest: any): Promise<any> {
    paramsRequest = !paramsRequest ? {} : paramsRequest;
    return new Promise((resolve, reject) => {
      this.http.delete(path, { params: paramsRequest }).subscribe({
        next: (data) => resolve(data),
        error(err) {
          if (err && err.status == 200) {
            reject(null);
          } else {
            reject(err);
          }
        },
      });
    });
  }

  protected makePostRequest(
    path: string,
    data?: any,
    params?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(path, data, { params: params }).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }

  protected makePutRequest(path: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(path, data).subscribe({
        next: (data) => resolve(data),
        error: (err) => reject(err),
      });
    });
  }
}
