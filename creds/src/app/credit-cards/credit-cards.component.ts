import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { CreditCards } from '../../models';
import { SharedService } from '../../services/shared.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-credit-cards',
  imports: [
    CommonModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './credit-cards.component.html',
  styleUrl: './credit-cards.component.css',
})
export class CreditCardsComponent {
  url: string = '';
  baseUrlEnv: string = '';
  isLoadingList: any = [];
  isBrowser: boolean;
  screenWidth: number = 0;
  subscribedList: any[] = [];
  structuredDataSet: boolean = false; // Add this property
  structuredData: SafeHtml | undefined;
  structuredDataJSON: any;
  banks: CreditCards[] = [];
  searchForm: FormGroup;
  searchTerm = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    public sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    public _utilService: UtilService,
    private _sharedService: SharedService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.fb.group({
      name: [''],
    });
    this._sharedService.getAccountDetails().subscribe((response) => {
      this.banks = _.orderBy(response, 'bank', 'desc');
    });
    this.baseUrlEnv = environment.baseUrl || '';
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && window) {
      // Safe to use window here
      this.screenWidth = window.innerWidth || 0;
    }
     this.structuredDataJSON = {
      '@context': 'https://schema.org/',
      '@type': 'ItemList',
      provider: {
        '@type': 'Organization',
        name: 'The Great Digital Services',
        url: `${environment?.baseUrl}/credit-cards`,
      },
      itemListElement: this.banks?.map((bank, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${environment?.baseUrl}/credit-cards/${bank?.name || ''}`,
        name: bank?.name || '',
        bank: bank?.bank || '',
        image: bank.imgUrl || environment?.baseUrl + '/logo.png',
        logo: bank.logoUrl || environment?.baseUrl + '/logo.png',
      })),
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

  searching(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value || '';
    this._sharedService.getAccountDetails().subscribe((response) => {
      this.banks = _.orderBy(
        response.filter((x) =>
          x.name.toLowerCase().includes(value.toLowerCase())
        ),
        'bank',
        'desc'
      );
    });
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot?.params?.['id'] || '';
    this.searchForm.get('name')?.setValue(this.searchTerm);
    this.url = this.router.url;
    this.title.setTitle(`${
        this._utilService.toTitleCase(this.searchTerm) || ''
      } Credit Cards - The Great Digital Services`);
    this.meta.updateTag({
      name: 'description',
      content: `Discover, Best Quality Digital Services, Credit Cards & Hosting Services At The Great Digital Services.`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: `Contact, Discover, Find, Great, Latest, Today, Best, Quality, Digital, Hosting, Services, Buy, Online, Credit Cards, ${
        this._utilService.toTitleCase(this.searchTerm) || ''
      }`,
    });
    // Add Open Graph meta tags for social sharing
    this.meta.updateTag({
      property: 'og:title',
      content: `${
        this._utilService.toTitleCase(this.searchTerm) || ''
      } Credit Cards - The Great Digital Services`,
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
