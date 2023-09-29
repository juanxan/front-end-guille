import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PedidoSave } from '../interface/pedido.interface';
import { NO_TOKEN } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;

  constructor() { }

  getPedidos(){
    const url =  `${this.domain}/api/pedido/all`;
    return this.http.get(url);
  }

  postPedido(data: PedidoSave){
    const url =  `${this.domain}/api/pedido/new`;
    return this.http.post(url, data, {responseType: 'text', context: new HttpContext().set(NO_TOKEN, true)});
  }
}
