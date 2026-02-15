import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css',
})
export class DocumentDetailComponent {
  document: Document;
  id: number;
  nativeWindow: any;

  constructor(private documentService: DocumentService,
              private windowRefService: WindRefService,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.document = this.documentService.getDocument(this.id);
      }
    )
    this.nativeWindow = this.windowRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
}
