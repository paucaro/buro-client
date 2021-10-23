import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'buro-client';

  constructor(public auth: AuthService){}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout();
  }
}
