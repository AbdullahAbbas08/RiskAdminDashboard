import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SourceMarketApiService } from 'src/app/shared/API-Service/source-market-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetCallReason } from 'src/app/shared/Models/get-call-reason';
import { GetSourceMarket } from 'src/app/shared/Models/get-source-market';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-source-market',
  templateUrl: './source-market.component.html',
  styleUrls: ['./source-market.component.css']
})
export class SourceMarketComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetSourceMarket>;
  Response_List: GetSourceMarket[];

  //#endregion

  //#region constructor
  constructor(private ApiService: SourceMarketApiService,
    private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.Get();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Call Reason
  Get() {
    this.ApiService.Get().subscribe(
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
  Delete(id: number) {
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
          console.log(id);
          
          this.ApiService.Delete(id).subscribe(
            response => {
              this.Get();
              Swal.fire({
                icon: 'success',
                title: "تم حذف العنصر بنجاح",
                showConfirmButton: false,
                timer: 1500
              })
            },
            err => {
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
  AddNew() {
    this.router.navigateByUrl("admin/InsertSourceMarket");
  }
  //#endregion

  //#region Governoate
  update(id: number,order: number, title: string) {
    this.ApiService.title = title;
    this.ApiService.order = order;
    this.router.navigate(['admin/updateSourceMarket', id]);
  }
  //#endregion


}
