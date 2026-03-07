import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = []
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<Contact[]>(
      "https://km-cms-d7446-default-rtdb.firebaseio.com/contacts.json"
    ).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((con1, con2) => {
          if (con1.name < con2.name) return -1;
          if (con1.name > con2.name) return 1;
          return 0;
        })
        this.contactChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getContact(id:string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContactIndex(index:number) {
    return this.contacts[index];
  }

  storeContact(contacts: Contact[]) {
    const contactString = JSON.stringify(contacts);
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    this.http.put(
      "https://km-cms-d7446-default-rtdb.firebaseio.com/contacts.json",
      contactString,
      { headers: headers }
    ).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    })
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContact(this.contacts);
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContact(this.contacts);
  }
  
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContact(this.contacts);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts){
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
