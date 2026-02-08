import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css',
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor(private contactService: ContactService) {}

  ngOnInit() {}

  onSelected() {
    this.contactService.contactSelectedEvent.emit(this.contact);
  }
}
