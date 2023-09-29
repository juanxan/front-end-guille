import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule, FormsModule,FormControl, FormGroup, Validators } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  protected formLogin: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

constructor(
  private readonly authService: AuthService,
  private readonly router: Router,
){}

  showPassword = false;

  goPages(){
    this.router.navigate(['/pages']);
  }

  changeType(){
    this.showPassword = !this.showPassword;
  }

  login(){
    this.authService.login(this.formLogin.value).subscribe({
      next: (oResp)=>{
        console.log(oResp);
        this.router.navigate(['/admin']);
      }, 
      error: (oErr)=>{
        console.log(oErr);
        
      }
    });
  }

}
