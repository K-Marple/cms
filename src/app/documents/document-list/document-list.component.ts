import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model'

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent {
  @Output() documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', 'How to Sleep', 'Studies and essays on effective sleep habits', 'sleephabits.fakesite.com', ''),
    new Document('2', 'Guide to Happiness', 'How to find happiness in the little things of life', 'begrateful.fakesite.com', ''),
    new Document('3', 'Artwork for the Ages', 'Comprehensive list of the greatest works of art.', 'agelessart.fakesite.com', ''),
    new Document('4', 'Learn the Harp', 'Lessons, music, and videos on learning to play the harp.', 'learnharp.fakesite.com', ''),
    new Document('5', 'Healthy Livingstyles', 'A look into different ways to live happy and healthy.', 'healthandlife.fakesite.com', '')
  ];

  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.documentSelectedEvent.emit(document);
  }

}
