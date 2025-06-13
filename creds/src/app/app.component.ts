import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocialLinksComponent } from './social-links/social-links.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialLinksComponent, FooterLinksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'creds';
}
