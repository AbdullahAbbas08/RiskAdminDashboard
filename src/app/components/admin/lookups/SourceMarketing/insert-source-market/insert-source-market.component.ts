import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CallReasonApiService } from 'src/app/shared/API-Service/call-reason-api.service';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { InsertCallReason } from 'src/app/shared/Models/insert-call-reason';
import { InsertSourceMarket } from 'src/app/shared/Models/InsertSourceMarket';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-insert-source-market',
  templateUrl: './insert-source-market.component.html',
  styleUrls: ['./insert-source-market.component.css']
})
export class InsertSourceMarketComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update:boolean;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
              private toaster: ToastrService,
              private ApiService:SourceMarketApiService,
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
    this.Get()
  }
  //#endregion

  //#region  Insert Call Reason Method
  Insert(){        
    this.ApiService.Insert({title:this.InsertForm.get('Title').value , order:this.InsertForm.get('Order').value} as InsertSourceMarket  ).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم إضافة مصدر  بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/GetSourceMarket");
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
  Update(){
    let id = +this.route.snapshot.paramMap.get('id');
    this.ApiService.Update(id,{title:this.InsertForm.get('Title').value,order:this.InsertForm.get('Order').value} as InsertSourceMarket).subscribe(
      response=>{
        Swal.fire({
          icon: 'success',
          title: "تم تعديل المصدر بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("admin/GetSourceMarket");
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
    Get() {
      this.ApiService.Get().subscribe(
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
