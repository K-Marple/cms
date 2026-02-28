import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent {
  id: string;
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  groupContacts: Contact[] = [];

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params["id"];
        if (!this.id) {
          this.editMode = false;
          return;
        }
        // this.editMode = params["id"] != null;
        this.originalContact = this.contactService.getContact(this.id);
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.originalContact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.group
    );
    if (this.editMode == true) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact)
    }
    this.router.navigate(["/contacts"]);
  }

  onCancel() {
    this.router.navigate(["/contacts"]);
  }
}
