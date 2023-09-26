import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const hubUrl = ""

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: HubConnection;

  constructor() { 
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(hubUrl)
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
