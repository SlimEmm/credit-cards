import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('About Us - The Great Digital Services');
    this.meta.updateTag({
      name: 'description',
      content: `Latest details about The Great Digital Services.`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `About, Contact, Discover, Find, Great, Latest, Today, Best, Quality, Digital, Hosting, Services, Buy, Online, Credit Cards`,
    });
    // Add Open Graph meta tags for social sharing
    this.meta.updateTag({
      property: 'og:title',
      content: 'About Us - The Great Digital Services',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: `Latest details about The Great Digital Services.`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: environment.baseUrl + '/logo.png',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `${environment.baseUrl}/about`,
    });
  }
}
