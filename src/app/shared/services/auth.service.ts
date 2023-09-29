import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NO_TOKEN } from '../interceptors/auth.interceptor';
import {  map } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;

  constructor(
    private readonly router: Router
  ) { }

  login(form: any){
    const url =  `${this.domain}/api/auth/login`;
    return this.http.post(url, form, {context: new HttpContext().set(NO_TOKEN, true)}).pipe(
      map((resp:any)=>{
        this.setToken(resp);
    return resp;
    }));
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
      .then(()=>{
          window.location.reload();
      });
  }

  setToken(resp: any){
    sessionStorage.setItem('token',resp.token);
  }

  isLogged(): boolean {
    return sessionStorage.getItem('token') !== undefined  && sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== '';
  }
}
