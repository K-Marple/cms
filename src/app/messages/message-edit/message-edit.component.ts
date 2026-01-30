import { Component, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild("subjectInput") subjectInputRef: ElementRef;
  @ViewChild("msgTextInput") msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Marple";



  constructor() {}

  ngOnInit() {}

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgMsgText = this.msgTextInputRef.nativeElement.value;
    const currentSender = this.currentSender;
    const newMessage = new Message('7', msgSubject, msgMsgText, currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
