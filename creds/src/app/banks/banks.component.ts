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
import { SharedService } from '../../services/shared.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-banks',
  imports: [
    CommonModule,
    NgbTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './banks.component.html',
  styleUrl: './banks.component.css',
})
export class BanksComponent {
  url: string = '';
  baseUrlEnv: string = '';
  isLoadingList: any = [];
  isBrowser: boolean;
  screenWidth: number = 0;
  subscribedList: any[] = [];
  structuredDataSet: boolean = false; // Add this property
  structuredData: SafeHtml | undefined;
  structuredDataJSON: any;
  banks: any;
  bankKeys: any;
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
    this.baseUrlEnv = environment.baseUrl || '';
    this.isBrowser = isPlatformBrowser(this.platformId);
    this._sharedService.getAccountDetails().subscribe((response) => {
      this.banks = response;
      this.bankKeys = Object.keys(_.groupBy(this.banks, 'bank'));
    });

    if (this.isBrowser && window) {
      // Safe to use window here
      this.screenWidth = window.innerWidth || 0;
    }
    this.structuredDataJSON = {
      '@context': 'https://schema.org/',
      '@type': 'ItemList',
      itemListElement: this.banks?.map((bank: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${environment?.baseUrl}/banks/${bank?.bank || ''}`,
        name: bank?.name || '',
        bank: bank?.bank || '',
        image: bank.imgUrl || environment?.baseUrl + '/logo.png',
        logo: bank.logoUrl || environment?.baseUrl + '/logo.png',
      })),
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      provider: {
        '@type': 'Organization',
        name: 'The Great Digital Services',
        url: `${environment?.baseUrl}/banks`,
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
      this.banks = response.filter((x) =>
        x.bank.toLowerCase().includes(value.toLowerCase())
      );
      this.bankKeys = Object.keys(_.groupBy(this.banks, 'bank'));
    });
  }

  ngOnInit() {
    this.searchTerm = this.route.snapshot?.params?.['id'] || '';
    this.searchForm.get('name')?.setValue(this.searchTerm);
    if (this.searchTerm) {
      this._sharedService.getAccountDetails().subscribe((response) => {
        this.banks = response.filter((x) =>
          x.bank.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.bankKeys = Object.keys(_.groupBy(this.banks, 'bank'));
      });
    }
    this.url = this.router.url;
    this.title.setTitle(
      `${
        this._utilService.toTitleCase(this.searchTerm) || ''
      } Banks - The Great Digital Services`
    );
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
      } Banks - The Great Digital Services`,
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
