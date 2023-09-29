import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto, ProductoSave } from '../interface/producto.interface';
import { NO_TOKEN } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;

  constructor() { }

  getProducts(){
    const url =  `${this.domain}/api/producto/all`;
    return this.http.get(url, {context: new HttpContext().set(NO_TOKEN, true)});
  }

  postProducts(data: Producto){
    const url =  `${this.domain}/api/producto/new`;
    return this.http.post(url, data, {responseType: 'text'});
  }

  deleteProduct(data: number){
    const url =  `${this.domain}/api/producto/delete/${data}`;
    return this.http.post(url, data, {responseType: 'text'});
  }

}
