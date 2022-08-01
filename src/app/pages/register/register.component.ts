import { CustomersService } from 'src/app/services/customers/customers.service';
import { Customer } from 'src/app/models/customer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'etiya-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  // companyName = new FormControl('', Validators.required);

  constructor(private formBuilder:FormBuilder, private customersService:CustomersService) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(): void {
    this.registerForm= this.formBuilder.group(
      {
        companyName:['' ,
      //default değer
      [Validators.required, Validators.minLength(2)],
       //doğrulama
      
    ],
 
 
  contactName:['' ,[Validators.required, Validators.minLength(2)],],
contactTitle:['' ,[Validators.required, Validators.minLength(2)],],
street:['' ,[Validators.required, Validators.minLength(2)],],
city:['' ,[Validators.required, Validators.minLength(2)],],
region:['' ,[Validators.required, Validators.minLength(2)],],
postalCode:['' ,[Validators.required, Validators.minLength(2)],],
country:['' ,[Validators.required, Validators.minLength(2)],],
phone:['' ,[Validators.required, Validators.minLength(2)],],
customerKey:['' ,[Validators.required, Validators.minLength(2)],],  });
  }

    
  //   new FormGroup({
  //     companyName: this.companyName,
  //   });
  // }

    register( ): void {
      if(!this.registerForm.valid){
        console.warn("Gerekli alanları doldurunuz.");
        return;
      }
      const customer: Customer = {
        ...this.registerForm.value,
        city: this.registerForm.value.city.toUpperCase()
      };

      // console.log(this.registerForm.value);
      this.customersService.add(customer).subscribe(response => {
        console.info(response);
      });
  
    }
  
}
