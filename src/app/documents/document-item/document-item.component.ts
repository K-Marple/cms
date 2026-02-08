import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css',
})

export class DocumentItemComponent {
  @Input() document: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {}

  onSelected() {
    this.documentService.documentSelectedEvent.emit(this.document);
  }
}
