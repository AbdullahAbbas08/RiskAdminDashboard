import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { EmployeeApiService } from 'src/app/shared/API-Service/employee-api.service';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { GetEmployee } from 'src/app/shared/Models/GetEmployee';
import { InsertClientType } from 'src/app/shared/Models/insert-client-type';
import { IdNameList } from 'src/app/shared/Models/IdNameList';
import { InsertEmployee } from 'src/app/shared/Models/InsertEmployee';
import Swal from 'sweetalert2';
import { GetClient } from 'src/app/shared/Models/GetClient';

@Component({
  selector: 'app-InsertCustomerService',
  templateUrl: './InsertCustomerService.component.html',
  styleUrls: ['./InsertCustomerService.component.css']
})
export class InsertCustomerServiceComponent implements OnInit {

  //#region Decalre varaibles
  EmployeeForm: FormGroup;
  _InsertClientType:InsertClientType;
  maxDate: Date;
  update:boolean;
  pass:string;
  Client_List: GetClient[];
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: IdNameList[] = [];
  selectedItemsIds: number[] = [];
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:EmployeeApiService,
              private clientApiService: ClientApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { this.maxDate = new Date();
    this.GetClient()

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   
 

    if(this.route.snapshot.paramMap.get('id')){

      this.InitForm(this.ApiService.Employee)
      this.update = true;
    }else
    {
      this.update = false;
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(employee:GetEmployee){
    this.EmployeeForm = this._formBuilder.group({
      name: [employee.name, Validators.required],
      username: [employee.userName, Validators.required],
      password: ['', Validators.nullValidator],
      nationalId: [employee.nationalId, Validators.required],
      mobile: [employee.mobile, Validators.required],
      address: [employee.address, Validators.required],
      Clients: [employee.address, Validators.required],
    });
  }
  _InitForm(){
    this.EmployeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.nullValidator],
      nationalId: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['', Validators.required],
      Clients: ['', Validators.required],
    });
  }
  //#endregion


  //#region  Insert Client-Type Method
  InsertClientType(){    
    
    if(this.EmployeeForm.get('password').value =='')
    {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text:'كلمة المرور مطلوبة',
      })
    }
    else
    {
      this.ApiService.InsertEmployee({ 
        name:this.EmployeeForm.get('name').value ,
        userName:this.EmployeeForm.get('username').value ,
        nationalId:this.EmployeeForm.get('nationalId').value ,
        address:this.EmployeeForm.get('address').value ,
        mobile:this.EmployeeForm.get('mobile').value ,
        password:this.EmployeeForm.get('password').value ,
      } as InsertEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/GetEmployee");
      },
      err=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
    }
 
  }
  //#endregion

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
    } as GetEmployee).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل بيانات الموظف بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/GetEmployee");
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

    //#region  Get Client
    GetClient() {
      this.clientApiService.GetClientIdName().subscribe(
        response => {
          this.dropdownList = response.data
          console.log(this.dropdownList);
          
        //  response.data.forEach(element => {
        //    this.dropdownList.push({Id:element.clientId,Name:element.name} );
        //    console.log(this.dropdownList);
        //  });  
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

  onItemSelect(item: any) {
    console.log(this.selectedItems)
  }

  onSelectAll(items: any) {
    // console.log(items);
  }

}
