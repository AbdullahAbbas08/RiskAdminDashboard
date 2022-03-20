import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import { InsertCities } from 'src/app/shared/Models/InsertCities';
import Swal from 'sweetalert2';
import { CitiesApiService } from '../../../../../shared/API-Service/cities-api.service';


@Component({
  selector: 'app-insert-cities',
  templateUrl: './insert-cities.component.html',
  styleUrls: ['./insert-cities.component.css']
})
export class InsertCitiesComponent implements OnInit {

  //#region Decalre varaibles
  InsertForm: FormGroup;
  maxDate: Date;
  update: boolean;
  Governorate_Dictionary:{[Id:number]:string} = {}
  Governorate_List:GetGovernorate[];
  Govern_id:number;
  Governorate:string;
  //#endregion

  //#region  constructor
  constructor(private _formBuilder: FormBuilder,
    private toaster: ToastrService,
    private citiesApiService: CitiesApiService,
    private governorateApiService:GovernorateApiService,
    private router: Router,
    private route: ActivatedRoute) { this.maxDate = new Date(); }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {

    this.Govern_id = -1;
    this.getGovernoate();
    
    
    if (this.route.snapshot.paramMap.get('id')) {
      this.InitForm(this.citiesApiService.title)
      this.governorateApiService.GetGovernorate().subscribe(
        response => {
          this.Governorate = response.data.find(x=>x.id == this.citiesApiService.GovernorateId)?.title;
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: err.error,
          })
        }
      )
           
      this.update = true;
    } else {
      this.update = false;
      this._InitForm();
      this.Governorate = "أختر المحافظة";
    }
  }
  //#endregion

  //#region  Init Form
  InitForm(title: string) {
    this.InsertForm = this._formBuilder.group({
      Title: [title, Validators.required],
      GovernorateId: ['-1', Validators.nullValidator],
    });
  }
  _InitForm() {
    this.InsertForm = this._formBuilder.group({
      Title: ['', Validators.required],
      GovernorateId: ['', Validators.nullValidator],
    });
  }
  //#endregion

  //#region  Insert Cities Method
  InsertCities() {
    console.log("this.InsertForm.get('GovernorateId') : ",this.InsertForm.get('GovernorateId').value);
    
    if(this.Govern_id == -1){
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: "أختر المحافظة أولا",
      })
    }else
    {
      this.citiesApiService.InsertCities({
        cityName: this.InsertForm.get('Title').value,
        governorateID: this.Govern_id
      } as InsertCities).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: "تم إدخال المدينة بنجاح",
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl("content/admin/Get-cities");
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
  
  }
  //#endregion

  //#region Update Cities
  UpdateCities() {
    let id = +this.route.snapshot.paramMap.get('id');
    console.log('Title : ',this.InsertForm.get('Title').value);
    
    this.citiesApiService.UpdateCities(id, {
      cityName: this.InsertForm.get('Title').value,
      governorateID: this.citiesApiService.GovernorateId
    } as InsertCities).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: "تم تعديل المدينة بنجاح",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigateByUrl("content/admin/Get-cities");
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

  //#region Selected Governorate
  SelectedGovernorate(event:any){
    this.Govern_id = event.target.value;
  }
  //#endregion

  //#region  get Governoate
    getGovernoate() {
      this.governorateApiService.GetGovernorate().subscribe(
        response => {
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

}
