import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { Customer } from 'src/app/models/customer';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'etiya-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  editCustomerForm: FormGroup;
  customer:Customer
  constructor(private customersService: CustomersService,
     private formBuilder: FormBuilder,
     private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.getCustomer()
  }

  createEditCustomerForm() {
    this.editCustomerForm = this.formBuilder.group({
      id:[this.customer.id,Validators.required],
      companyName: [
        this.customer.companyName,
        //default değer
        [Validators.required, Validators.minLength(2)]
        //doğrulama
      ],
      contactName: [this.customer.contactName, [Validators.required]],
      contactTitle: [this.customer.contactName, [Validators.required]],
      street: [this.customer.street, [Validators.required]],
      city: [this.customer.city, [Validators.required]],
      region: [this.customer.region, [Validators.required]],
      postalCode: [this.customer.postalCode, [Validators.required]],
      country: [this.customer.country, [Validators.required]],
      phone: [this.customer.phone, [Validators.required]],
      customerKey: [this.customer.customerKey, [Validators.required]]
    });
  }

  getCustomer(){
    this.activatedRoute.params.subscribe(param=>{
      if(param["id"]){
        this.customersService.getCustomer(param ["id"]).subscribe(data =>{
          this.customer = data
          console.log(this.customer)
          this.createEditCustomerForm()

        })
      }
    })
  }
  
  edit(){
    if(this.editCustomerForm.valid){
      this.customer = Object.assign({},this.editCustomerForm.value)  
    }
    console.log(this.customer)
    this.customersService.editCustomer(this.customer).subscribe(response=>{
      alert("customer successfully edited")
      setTimeout(() => {
        location.href = "/dashboard/customers"
      }, 3000);
    })
  }
}
