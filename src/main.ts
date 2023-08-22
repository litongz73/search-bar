import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SearchUserComponent } from './search-user/search-user.component';
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, SearchUserComponent],
  template: `
    <app-search-user></app-search-user>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideAnimations()],
});
