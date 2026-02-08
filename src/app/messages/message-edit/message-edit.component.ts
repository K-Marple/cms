import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild("subjectInput") subjectInputRef: ElementRef;
  @ViewChild("msgTextInput") msgTextInputRef: ElementRef;
  currentSender: string = "Marple";

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  onSendMessage() {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgMsgText = this.msgTextInputRef.nativeElement.value;
    const currentSender = this.currentSender;
    const newMessage = new Message('7', msgSubject, msgMsgText, currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = "";
    this.msgTextInputRef.nativeElement.value = "";
  }

}
