import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected readonly title = signal('cms');

  @Input() selectedFeature = "documents";

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
