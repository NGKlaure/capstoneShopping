import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from  '@angular/router';
import { AuthService } from  'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    /* console.log(this.loginForm.value);
     this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }  */
    //this.authService.getlogin();
    this.router.navigateByUrl('/shop');
  }
}
