import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('3', 'Hello', 'This is an automated greeting.', 'Your computer'),
    new Message('1', 'Letter', 'We just got a letter.', 'Blue'),
    new Message('5', 'Hello Darkness', 'Hey old friend. Come to talk again.', 'Sleep'),
    new Message('4', 'Song', 'Do you hear the song of angry men?', 'Drums')
  ]

  constructor() {}

  ngOnInit() {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
