import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private subject: Rx.Subject<MessageEvent> | undefined;

  constructor() {}

  public connect(url: string): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }
  private create(url: string): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = (event: MessageEvent) => {
        obs.next(event);
      };
      ws.onerror = (error: Event) => {
        obs.error(error);
      };
      ws.onclose = (event: CloseEvent) => {
        obs.complete();
      };
      return () => {
        ws.close();
      };
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
    };
    return Rx.Subject.create(observer, observable);
  }
}
