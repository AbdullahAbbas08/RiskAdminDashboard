import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientApiService } from 'src/app/shared/API-Service/client-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { GetClient } from 'src/app/shared/Models/GetClient';
import { GetClientType } from 'src/app/shared/Models/GetClientType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Client',
  templateUrl: './Client.component.html',
  styleUrls: ['./Client.component.css']
})
export class ClientComponent implements OnInit {

  //#region  Declare Variables
  response: GenericResponse<GetClient>;
  Client_List: GetClient[];
  //#endregion

  //#region constructor
  constructor(private ApiService: ClientApiService , private router:Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Client_List = [];
    this.GetClient();
  }
  //#endregion

  //#region Consume API's

  //#region  Get Client
  GetClient() {
    this.ApiService.GetClient().subscribe(
      response => {
        this.response = response;
        this.Client_List = response.data;
        console.log(this.Client_List);
        
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

  //#region  Delete Client 
  DeleteClient(id:string){    
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
          this.ApiService.DeleteClient(id).subscribe(
            response=>{
              this.GetClient();
               Swal.fire({
                    icon: 'success',
                    title: "تم حذف العميل بنجاح",
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

  //#region Add New
  NavigateToInsertClient(){
    this.router.navigateByUrl("admin/InsertClient");
  }
  //#endregion

  //#region update Client
  updateClient(Client:GetClient){
    this.ApiService.Client = Client;
    
    this.router.navigate(['admin/updateClient',Client.clientId]);
  }
  //#endregion

}
