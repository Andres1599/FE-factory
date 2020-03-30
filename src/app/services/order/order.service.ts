import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../../interfaces/OrderInterface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8HttpClient'
    );
  }

  newSale(sale: OrderInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/order', sale, {
      headers: this.headers
    });
  }

  readSale(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(environment.API_BASE + '/order', {
      headers: this.headers
    });
  }

  updateSale(sale: OrderInterface, path?: string): Observable<any> {
    return this.http.put(environment.API_BASE + '/order/' + path, sale, {
      headers: this.headers
    });
  }

  deleteSale(sale: OrderInterface): Observable<any> {
    return this.http.delete(environment.API_BASE + '/order/' + sale._id, {
      headers: this.headers
    });
  }
}
