import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject: Rx.Subject<MessageEvent> | undefined;
  private ws: WebSocket | undefined;

  constructor() {}

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      console.log('Disconnected from WebSocket');
      this.subject = undefined;
      this.ws = undefined;
    }
  }

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }
  private create(url: string): Rx.Subject<MessageEvent> {
    try {
      this.ws = new WebSocket(url);
      let observable = Rx.Observable.create(
        (obs: Rx.Observer<MessageEvent>) => {
          if (this.ws) {
            this.ws.onmessage = (event: MessageEvent) => {
              obs.next(event);
            };
            this.ws.onerror = (error: Event) => {
              obs.error(error);
            };
            this.ws.onclose = (event: CloseEvent) => {
              obs.complete();
            };
          }
          return () => {
            if (this.ws) {
              this.ws.close();
            }
          };
        }
      );
      let observer = {
        next: (data: Object) => {
          if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
          }
        },
      };
      return Rx.Subject.create(observer, observable);
    } catch (error) {
      console.error(error);
      return Rx.Subject.create({
        error: error,
      });
    }
  }
}
