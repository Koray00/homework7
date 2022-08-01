import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'etiya-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[];
  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe(data => {
        this.customers=data
    });
    
  }

  delete(id: number) {
    if (confirm('do you wanna delete?')) {
      this.customersService.delete(id).subscribe(data => {
        alert('customer successfuly deleted');
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    }
  }
}
