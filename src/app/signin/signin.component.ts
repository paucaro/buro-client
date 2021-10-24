import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  error: string = null;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: new FormControl('', {
        validators: Validators.compose([Validators.required,
        Validators.minLength(4), Validators.maxLength(20)]),
        updateOn:'blur'
      })
    })
  }

  get user() { return this.userForm.controls; }

  login() {
    if (this.loading) {
      return;
    }
    this.error = null;
    this.submitted = true;
    this.loading = true;
    if (this.userForm.invalid) {
      this.loading = false;
      return;
    }
    const user = this.userForm.value;
    console.log(user);
  }

}
