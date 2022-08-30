import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
@Injectable({
  providedIn: 'root'
})
export class StompService {

  // URL_BASE = "http://localhost:8090"
  URL_BASE = "http://Runtimeterrorinternshipapp-env.eba-exhqmhri.us-east-1.elasticbeanstalk.com"
  socket = new SockJS(this.URL_BASE + "/sba-websocket");
  stompClient = Stomp.over(this.socket);

  constructor() { }

  subscribe(topic:string, callback:any):void{
    const connected: boolean = this.stompClient.connected;
    if(connected){
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({},() : any => {
      this.subscribeToTopic(topic, callback);
    })

  }

  private subscribeToTopic(topic: string, callback: any): void{
    this.stompClient.subscribe(topic, (): any => {
      callback();
    })
  }

  disconnectWebSocket():void{
    this.stompClient.disconnect()
  }
}
