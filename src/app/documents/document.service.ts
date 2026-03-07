import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {}
  
  getDocuments() {
    this.http.get<Document[]>(
      "https://km-cms-d7446-default-rtdb.firebaseio.com/documents.json"
    ).subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((doc1, doc2) => {
          if (doc1.name < doc2.name) return -1;
          if (doc1.name > doc2.name) return 1;
          return 0;
        })
        this.documentChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getDocument(index:number) {
    return this.documents[index];
  }
  
  storeDocuments(documents: Document[]) {
    const documentsString = JSON.stringify(documents);
    const headers = new HttpHeaders({"Content-Type": "application/json"});
    this.http.put(
        "https://km-cms-d7446-default-rtdb.firebaseio.com/documents.json", 
        documentsString,
        { headers: headers }
      ).subscribe(() => {
          this.documentChangedEvent.next(this.documents.slice());
        }
    );
  }
  
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments(this.documents);
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments(this.documents);
  }
  
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments(this.documents);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}