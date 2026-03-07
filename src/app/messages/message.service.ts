import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];
  private maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http.get<Message[]>(
      "https://km-cms-d7446-default-rtdb.firebaseio.com/messages.json"
    ).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((mes1, mes2) => {
          if (mes1.subject < mes2.subject) return -1;
          if (mes1.subject > mes2.subject) return 1;
          return 0;
        })
        this.messageChangedEvent.next(this.messages.slice());
      }
    )
  }

  getMessage(id:string): Message {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  storeMessages(messages: Message[]) {
    const messageString = JSON.stringify(messages);
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    this.http.put(
      "https://km-cms-d7446-default-rtdb.firebaseio.com/messages.json",
      messageString,
      { headers: headers }
    ).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    })
  }

  addMessage(newMessage:Message) {
    if (!newMessage) {
      return;
    }
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages(this.messages);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
