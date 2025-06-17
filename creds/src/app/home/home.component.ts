import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '@environment';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../services/util.service';
import { CreditCards } from '../../models';
import { SharedService } from '../../services/shared.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    public sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object,
    public _utilService: UtilService,
    private _sharedService: SharedService
  ) {
    this._sharedService.getAccountDetails().subscribe((response)=>{
      this.banks = _.uniqBy(response,'bank');
    });
    this.baseUrlEnv = environment.baseUrl || '';
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && window) {
      // Safe to use window here
      this.screenWidth = window.innerWidth || 0;
    }
  }


  ngOnInit() {
    this.url = this.router.url;
    this.title.setTitle(`Home - The Great Digital Services`);
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
      content: `Contact, Discover, Find, Great, Latest, Today, Best, Quality, Digital, Hosting, Services, Buy, Online, Credit Cards.`,
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
