import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly http = inject(HttpClient);
  private readonly domain: string = environment.url;
  constructor(
  ) { }
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  getData(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  postPedido(data: any){
      const url =  `${this.domain}/api/pedido/new`;
      return this.http.post(url, data, {responseType: 'text'});
  }

}
