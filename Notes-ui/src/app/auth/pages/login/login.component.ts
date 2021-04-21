import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/inteface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(){
    const {email, password} = this.myForm.value;
    this.authService.login(email, password).subscribe((resp: LoginResponse) => {
      if(resp.success){
        this.router.navigateByUrl('/notes');
      }else{
        this.snackbar.open(resp.errors[0], 'Ok', {
          duration: 2000
        });
      }
    })
  }

}
