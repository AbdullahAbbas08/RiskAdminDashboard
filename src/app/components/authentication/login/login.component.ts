import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { RiskAuthenticationService } from '../../../shared/API-Service/RiskAuthentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  InsertForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
              private Authentication:RiskAuthenticationService, 
              private toastr:ToastrService,
              private SpinnerService: NgxSpinnerService,
              private router:Router) { }

  ngOnInit(): void {
    this.InitForm();
  }

  InitForm() {
    this.InsertForm = this._formBuilder.group({
      username: ['', Validators.required],
      passowrd: ['', Validators.required],
    });

  }

  Login(){
    this.RequestLogin({userName:this.InsertForm.get('username').value,password:this.InsertForm.get('passowrd').value})
  }

  RequestLogin(obj:any){
    // this.SpinnerService.show();

    this.Authentication.RequestLogin(obj).subscribe(
      (response)=>{
        // console.log(response['token']);
        
        localStorage.setItem('RiskAuthorization',response['token'])
        // localStorage.setItem('Name',this.AuthenticatedUser.Data.Name);
        // localStorage.setItem("logo",this.AuthenticatedUser.Data.Image);
        // this.toastr.success("تم تسجيل الدخول بنجاح", 'الحالة');
        window.setInterval(() => {
          // window.location.reload();
          this.router.navigate([""]);
          // this.SpinnerService.hide();
         }, 3000);
      },
      (err)=>{
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: err.error,
        })
      }
    )
  }
}
