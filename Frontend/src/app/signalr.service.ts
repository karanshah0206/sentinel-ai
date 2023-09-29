import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const HUB_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;

  constructor() { 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(HUB_URL)
    .build();
  }

  startConnection() {
    this.hubConnection.start().then(() =>{
      console.log("SignalR connection started");
      this.registerReceiveMessageHandler();
    })
    .catch((error) => {
      console.error('Error while starting SignalR connection', error);
    });
  }

  registerReceiveMessageHandler() {
    this.hubConnection.on('ReceiveMessage', (message) => {
      console.log('Received Message:', message);
      // handling logic here
    });
  }

  stopConnection() {
    this.hubConnection.stop().then(() => {
      console.log('SignalR connection stopped');
    });
  }
}
