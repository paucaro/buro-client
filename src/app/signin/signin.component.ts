import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'environments/environment';
import { ApiService } from 'app/services/shared/api.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoading: boolean = false;
  username: string = "";
  password: string = "";

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void { }

  onSignIn(form: NgForm){
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.username,
          Password: this.password,
      });
      let poolData = {
        UserPoolId: environment.cognitoUserPoolId,
        ClientId: environment.cognitoAppClientId
      };

      let userPool = new CognitoUserPool(poolData);
      let userData = { Username: this.username, Pool: userPool };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          console.log(result);
          this.router.navigate(["dashboard"])
        },
        onFailure: (err) => {
          alert(err.message || JSON.stringify(err));
          this.isLoading = false;
        },
      });
    }
  }

}
