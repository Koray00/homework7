import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  apiControllerUrl: string = `${environment.apiUrl}/customers`;

  constructor(private httpClient: HttpClient) {}



  add(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(this.apiControllerUrl, customer);
  }

  getCustomers(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.apiControllerUrl)
  }

  editCustomer(customer:Customer): Observable<Customer>{
    return this.httpClient.put<Customer>(this.apiControllerUrl +"/"+ customer.id ,customer)
  } 

  
  
  getCustomer(id:number): Observable<Customer>{
    return this.httpClient.get<Customer>(this.apiControllerUrl +"/"+ id)
  }

  delete(id:number): Observable<Customer> {
    return this.httpClient.delete<Customer>(this.apiControllerUrl+ "/" + id)
  }



}
