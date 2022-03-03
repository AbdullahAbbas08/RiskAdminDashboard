import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
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
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:CallReasonApiService,
              private router:Router,
              private route: ActivatedRoute) 
  { 
    this.maxDate = new Date();
  }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
   
    if(this.route.snapshot.paramMap.get('id')){

      this.InitForm(this.ApiService.title , this.ApiService.order)
      this.update = true;
      console.log(this.update);
    }else
    {
      this.update = false;
      console.log(this.update);
      
      this._InitForm();
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(title:string,order:number){
    this.InsertForm = this._formBuilder.group({
      Title: [title, Validators.required],
      Order: [order, Validators.required],
    });
  }
  _InitForm(){
    
    this.InsertForm = this._formBuilder.group({
      Title: ['', Validators.required],
      Order: ['', Validators.required],
    });
    this.GetCallReason()
  }
  //#endregion

  //#region  Insert Call Reason Method
  InsertCallReason(){        
    this.ApiService.InsertCallReason({title:this.InsertForm.get('Title').value , order:this.InsertForm.get('Order').value} as InsertCallReason  ).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة السبب  بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/Get-Call-Reason");
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
        Swal.fire({
          icon: 'success',
          title: "تم تعديل السبب بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/Get-Call-Reason");
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

  }
