import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olp-login',
  templateUrl: './olp-login.component.html',
  styleUrl: './olp-login.component.css',
  standalone:false
})
export class OlpLoginComponent implements OnInit {

  olpLoginForm:FormGroup | undefined;
  userName:string | undefined;
  isHovered: boolean = false;
  constructor(
    private router:Router,
    private fb: FormBuilder
  ){}
  ngOnInit(): void {
    this.initFormValidation();
  }
  initFormValidation(){
    this.olpLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
   onLogin(): void {
    if (this.olpLoginForm?.valid) {
      const formValue = this.olpLoginForm.value;
      console.log('Login submitted', formValue);
    this.router.navigateByUrl('/dashboard')
      // implement login logic here
    }
  }
}
