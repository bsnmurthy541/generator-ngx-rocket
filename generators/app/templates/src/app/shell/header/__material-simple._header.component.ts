import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

<% if (props.auth) { -%>
import { AuthenticationService, CredentialsService } from '@app/auth';
<% } -%>

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() sidenav!: MatSidenav;

<% if (props.auth) { -%>
  constructor(private router: Router,
              private titleService: Title,
              private authenticationService: AuthenticationService,
              private credentialsService: CredentialsService) { }
<% } else { -%>
  constructor(private titleService: Title) { }
<% } -%>

  ngOnInit() { }

<% if (props.auth) { -%>
  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

<% } -%>
  get title(): string {
    return this.titleService.getTitle();
  }

}
