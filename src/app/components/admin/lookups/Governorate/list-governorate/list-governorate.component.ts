import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-governorate',
  templateUrl: './list-governorate.component.html',
  styleUrls: ['./list-governorate.component.css']
})
export class ListGovernorateComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetGovernorate>;
  Response_List: GetGovernorate[];
  //#endregion

  //#region constructor
  constructor( private governorateApiService:GovernorateApiService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.getGovernoate();
  }
  //#endregion

  //#region Consume API's

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.response = response;
        this.Response_List = response.data;
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

  //#region  Delete Governoate
  Delete(id:number){
    Swal.fire({
      title: ' تحذير !',
      text: "هل انت متأكد من حذف هذا العنصر ؟ ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'حذف',
      cancelButtonText: 'إنهاء',
    })
    .then((result) => {

      if (result.isConfirmed) {
          this.governorateApiService.DeleteGovernorate(id).subscribe(
            response=>{
              this.getGovernoate();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف نوع المحافظة بنجاح",
                    showConfirmButton: false,
                    timer: 1500}) 
                  },
            err=>{
              Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: err.error,
              })
            }
          )
        
      } else {
        // Swal.fire(
        //   'Your appointment still active ',
        // );
      }
    }); 
  }
  //#endregion
  
  //#endregion

  //#region AddNew
  AddNew(){
    this.router.navigateByUrl("content/admin/insert-governorate");
  }
  //#endregion

  //#region Governoate
  update(id:number,title:string){
    this.governorateApiService.title = title;
    localStorage.setItem("riskgovernorate",title)
    this.router.navigate(['content/admin/update-governorate',id]);
  }
  //#endregion

}
