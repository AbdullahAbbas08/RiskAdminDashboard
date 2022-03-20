import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { CustomerApiService } from 'src/app/shared/API-Service/customer-api.service';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import { InsertEmployee } from 'src/app/shared/Models/InsertEmployee';
import { Roles } from 'src/app/shared/Models/Roles';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deal-with-customer',
  templateUrl: './deal-with-customer.component.html',
  styleUrls: ['./deal-with-customer.component.css']
})
export class DealWithCustomerComponent implements OnInit {

  //#region Decalre varaibles
  EmployeeForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  Governorate_Dictionary:{[Id:number]:string} = {}
  Governorate_List:GetGovernorate[];
  Govern_id:number;
  Governorate:string;
  City:string;
  response: GenericResponse<GetGovernorate>;
  Response_List: getCities[];
  Filtered_List: getCities[];
  CityId:number;
  Gender:number;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:EmployeeApiService,
              private governorateApiService:GovernorateApiService,
              private citiesApiService: CitiesApiService,
              private customerApiService: CustomerApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.getGovernoate();
   
    // if(this.route.snapshot.paramMap.get('id')){

    //   this.InitForm(this.ApiService.Employee)
    //   this.update = true;
    // }else
    // {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
      this.City = "أختر المدينة";
    // }
  }
  //#endregion

  //#region  Init Form
  // InitForm(employee:GetEmployee){
  //   this.EmployeeForm = this._formBuilder.group({
  //     name: [employee.name, Validators.required],
  //     Gender: [employee.userName, Validators.required],
  //     DateOfBirth: ['', Validators.required],
  //     CityId: [employee.nationalId, Validators.required],
  //     mobile: [employee.mobile, Validators.required],
  //     address: [employee.address, Validators.required],
  //   });
  // }

  _InitForm(){
    this.EmployeeForm = this._formBuilder.group({
      name: [, Validators.nullValidator],
      Gender: [, Validators.nullValidator],
      DateOfBirth: [, Validators.nullValidator],
      CityId: [, Validators.nullValidator],
      mobile: [, Validators.nullValidator],
      address: [, Validators.nullValidator],
    });
  }
  //#endregion

  insertCustomer(){
    // console.log("form : ", this.EmployeeForm);
    
    let obj = {
     name: this.EmployeeForm.get('name').value,
     mobileNumber: this.EmployeeForm.get('mobile').value,
     CityId: +this.CityId,
     Gender: +this.Gender,
     dateOfBirth: this.EmployeeForm.get('DateOfBirth').value,
     address: this.EmployeeForm.get('address').value,
    }

    // console.log("r ---- : ",obj);
    

    this.customerApiService.InsertCustomer(obj).subscribe(
      (response)=>{
        // console.log("response : ",response['message']);
        if(response['message'] =="تم إضافة العميل بنجاح"){
          Swal.fire({
            icon: 'success',
            title: response['message'],
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/agent/main");
        } else
          {
            Swal.fire({
              icon: 'error',
              title: 'خطأ',
              text:response['message'],
            })
          }
      },
      (err)=>{
        console.log(err.error);
        
  Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:err.error,
      })
      }
    )
  }

  //#region Update Client
  UpdateClientType(){

    let id = this.route.snapshot.paramMap.get('id');

    if(this.EmployeeForm.get('password').value =='')
     this.pass = this.ApiService.Employee.password;
     else
     this.pass = this.EmployeeForm.get('password').value;

    this.ApiService.UpdateEmployee({ 
      id:id,
      name:this.EmployeeForm.get('name').value ,
      userName:this.EmployeeForm.get('username').value ,
      nationalId:this.EmployeeForm.get('nationalId').value ,
      address:this.EmployeeForm.get('address').value ,
      mobile:this.EmployeeForm.get('mobile').value ,
      password:this.pass ,
      Role:Roles.Admin
    } as GetEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/GetEmployee");
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.message,
        })
      }
    )
  }
  //#endregion

    //#region  get Governoate
    getGovernoate() {
      this.governorateApiService.GetGovernorate().subscribe(
        response => {
          // console.log("-----",response.data);
          
          this.Governorate_List = response.data;
          response.data.forEach(element => {
            this.Governorate_Dictionary[element.id] = element.title;            
          });
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error,
          })
        }
      )
    }
    //#endregion

      //#region  get Cities
  GetCities() {
    this.citiesApiService.GetCities().subscribe(
      response => {
        this.response = response;
        this.Response_List = response.data;
        this.Filtered_List = response.data;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
  }
  //#endregion

    //#region Selected Item
    SelectedItem(event:any){
      this.Gender = event.target.value
    }
    //#endregion

    //#region Selected City
    SelectedCity(event:any){
      this.CityId = event.target.value
    }
    //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event: any) {
    this.GetCities();
    this.Govern_id = event.target.value;
    if (event.target.value == -1)
      this.Filtered_List = this.Response_List;
    else
      this.Filtered_List = this.Response_List.filter(x => x.governorateId == event.target.value);
  }
  //#endregion



}
