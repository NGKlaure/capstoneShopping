import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { NgForm } from '@angular/forms';

/**
 *
 * @param form
 */

function passwordsMatchValidator(form) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')

  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true })
  } else {
    confirmPassword.setErrors(null)
  }

  return null
}

/**
 * If the data is valid return null else return an object
 */
function symbolValidator(control) { //control = registerForm.get('password')
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@') > -1) {
    return null
  } else {
    return { symbol: true }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private userRegister:RegisterService
    ) { }

 

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.registerForm = this.builder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, symbolValidator, Validators.minLength(4)]],
      confirmPassword: ''
    }, {
      validators: passwordsMatchValidator
    })
  }

  register(nf:NgForm) {
    //console.log(this.registerForm.value)
    this.userRegister.addUserToDB(nf.value)
    console.log('user is added')
    document.getElementById('register-result').innerHTML=" Successfull register"
  }

 /*  adduser(nf:NgForm){
   
    console.log('user is added')
    this.dt.addUserToDB(nf.value)
  } */
  /* this.productService.create(product).then((result: IProduct) => {
    if (result === undefined) {
      this.error = true;
    } else {
      this.error = false;
      this.createdProduct.emit(result);
    }
  }); */

}
