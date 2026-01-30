import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})

export class DocumentItemComponent {
  @Input() document: Document;
  @Output() documentClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClicked() {
    this.documentClicked.emit();
  }
}
