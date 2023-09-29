import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NO_TOKEN } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;
  constructor() { }

  getPedidos(){
    const url =  `${this.domain}/api/contact/all`;
    return this.http.get(url);
  }

  postPedido(data: any){
    const url =  `${this.domain}/api/contact/new`;
    return this.http.post(url, data, {responseType: 'text', context: new HttpContext().set(NO_TOKEN, true)});
  }

}
