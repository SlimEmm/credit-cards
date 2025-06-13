import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '@environment';

@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Privacy Policy - The Great Digital Services');
    this.meta.updateTag({
      name: 'description',
      content: `Privacy Policy of The Great Digital Services.`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `Privacy Policy, Contact, Discover, Find, Great, Latest, Today, Best, Quality, Digital, Hosting, Services, Buy, Online, Credit Cards`,
    });
    // Add Open Graph meta tags for social sharing
    this.meta.updateTag({
      property: 'og:title',
      content: 'Privacy Policy - The Great Digital Services',
    });
    this.meta.updateTag({
      property: 'og:description',
      content: `Privacy Policy for the great digital services at The Great Digital Services.`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: environment.baseUrl + '/logo.png',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: `${environment.baseUrl}/privacy-policy`,
    });
  }

}
