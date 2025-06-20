import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-hostings',
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './hostings.component.html',
  styleUrl: './hostings.component.css',
})
export class HostingsComponent {
  url: string = '';
  baseUrlEnv: string = '';
  isLoadingList: any = [];
  isBrowser: boolean;
  screenWidth: number = 0;
  subscribedList: any[] = [];
  structuredDataSet: boolean = false; // Add this property
  structuredData: SafeHtml | undefined;
  structuredDataJSON: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    public sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    public _utilService: UtilService
  ) {
    this.baseUrlEnv = environment.baseUrl || '';
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && window) {
      // Safe to use window here
      this.screenWidth = window.innerWidth || 0;
    }

    this.structuredDataJSON = {
      '@context': 'https://schema.org/',
      '@type': 'Service',
      url: `${environment?.baseUrl}/hostings`,
      name: 'Hostings',
      image:
        'https://cdn.grabon.in/gograbon/images/web-images/uploads/1735810325447/hostinger-coupon-codes%20.jpg',
      provider: {
        '@type': 'Organization',
        name: 'The Great Digital Services',
        url: `${environment?.baseUrl}/hostings`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    };
    if (this.isBrowser) {
      this.structuredData = this.sanitizer?.bypassSecurityTrustHtml(
        `<script type="application/ld+json">${JSON.stringify(
          this.structuredDataJSON
        )}</script>`
      );
      this.structuredDataSet = true;
    }
  }

  ngOnInit() {
    this.url = this.router.url;
    this.title.setTitle(`Hostings - The Great Digital Services`);
    this.meta.updateTag({
      name: 'description',
      content: `Discover, Best Quality Digital Services, Credit Cards & Hosting Services At The Great Digital Services.`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `Contact, Discover, Find, Great, Latest, Today, Best, Quality, Digital, Hosting, Services, Buy, Online, Credit Cards.`,
    });
    // Add Open Graph meta tags for social sharing
    this.meta.updateTag({
      property: 'og:title',
      content: `The Great Digital Services`,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: `Discover, Best Quality Digital Services, Credit Cards & Hosting Services At The Great Digital Services.`,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: environment.baseUrl + '/logo.png',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: environment.baseUrl + this.url,
    });
  }

  ngOnDestroy() {
    this.subscribedList.forEach((x: any) => {
      x?.unsubscribe();
    });
  }
}
