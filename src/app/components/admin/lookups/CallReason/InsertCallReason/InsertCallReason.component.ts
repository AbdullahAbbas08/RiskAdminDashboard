import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { ClientTypeApiService } from 'src/app/shared/API-Service/client-type-api.service';
import { Assign_ClientCustomer } from 'src/app/shared/Models/Assign_ClientCustomer';
import { CallClient } from 'src/app/shared/Models/CallClient';
import { InsertCallReason } from 'src/app/shared/Models/insert-call-reason';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-InsertCallReason',
  templateUrl: './InsertCallReason.component.html',
  styleUrls: ['./InsertCallReason.component.css']
})
export class InsertCallReasonComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update:boolean;
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any = [];
  selectedItems: any[] = [];
  callClient: CallClient[] = [];
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:CallReasonApiService,
              private clientTypeApiService: ClientTypeApiService ,
              private router:Router,
              private route: ActivatedRoute) 
  { 
    this.maxDate = new Date();
   
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.getClientType();

    if(this.route.snapshot.paramMap.get('id')){

      this.InitForm(this.ApiService.title , this.ApiService.order)
      this.update = true;
      // console.log(this.update);
      this.getClientTypeById(+this.route.snapshot.paramMap.get('id'));
      
    }else
    {
      this.update = false;
      // console.log(this.update);
      
      this._InitForm();
      this.GetCallReason()
    }


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'typeId',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  //#endregion

  //#region  Init Form
  InitForm(title:string,order:number){
    this.InsertForm = this._formBuilder.group({
      Title: [title, Validators.required],
      Order: [order, Validators.required],
      ClientTypes:[this.selectedItems,Validators.required]
    });
  }
  _InitForm(){
    
    this.InsertForm = this._formBuilder.group({
      Title: ['', Validators.required],
      Order: ['', Validators.required],
      ClientTypes:[ '', Validators.required]
    });
  
  }
  //#endregion

        //#region  Get Client Types
        getClientType() {
          this.clientTypeApiService.GetClientType().subscribe(
            response => {
              this.dropdownList = response.data;                
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

        //#region  Get Client Types
        getClientTypeById(id:number) {
          // console.log(id);
          
          this.clientTypeApiService.GetClientTypeById(id).subscribe(
            response => {
              this.selectedItems = response.data;
               
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

  //#region  Insert Call Reason Method
  InsertCallReason(){        
    this.ApiService.InsertCallReason({title:this.InsertForm.get('Title').value , order:this.InsertForm.get('Order').value} as InsertCallReason  ).subscribe(
      response=>{
        // console.log(response);
        
        this.InsertForm.get('ClientTypes').value.forEach(element => {
          
          this.callClient.push({ClientTypeId:element.typeId,CallReasonId:response['data'].id}as CallClient);
        });
        this.ApiService.CallReasonClientType(this.callClient).subscribe(
          (data)=>{
            Swal.fire({
              icon: 'success',
              title: "تم إضافة السبب  بنجاح",
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl("content/admin/Get-Call-Reason");
          },
          (err)=>{

          }
        )
        this.callClient =[];
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
  //#endregion

  //#region Update Call Reason
  UpdateCallReason(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.UpdateCallReason(id,{title:this.InsertForm.get('Title').value,order:this.InsertForm.get('Order').value} as InsertCallReason).subscribe(
      response=>{
        // console.log(response);
        
        this.InsertForm.get('ClientTypes').value.forEach(element => {
          
          this.callClient.push({ClientTypeId:element.typeId,CallReasonId:id}as CallClient);
        });
        this.ApiService.CallReasonClientType(this.callClient).subscribe(
          (data)=>{
            Swal.fire({
              icon: 'success',
              title: "تم تعديل السبب  بنجاح",
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigateByUrl("content/admin/Get-Call-Reason");
          },
          (err)=>{

          }
        )
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
  //#endregion

    //#region  Get Call Reason
    GetCallReason() {
      this.ApiService.GetCallReason().subscribe(
        response => {
         this.InsertForm.patchValue({Order:response.data.length+1});
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
      // console.log("---",this.EmployeeForm.get('Clients').value)
    }
  
    onSelectAll(items: any) {
      // console.log(items);
    }


  }
