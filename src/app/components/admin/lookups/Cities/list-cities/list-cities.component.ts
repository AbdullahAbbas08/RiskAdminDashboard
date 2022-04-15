import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitiesApiService } from 'src/app/shared/API-Service/cities-api.service';
import { GovernorateApiService } from 'src/app/shared/API-Service/governorate-api.service';
import { GenericResponse } from 'src/app/shared/Models/GenericResponse';
import { getCities } from 'src/app/shared/Models/getCities';
import { getCitiesWithGovernorate } from 'src/app/shared/Models/getCitiesWithGovernorate';
import { GetGovernorate } from 'src/app/shared/Models/GetGovernorate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit {

  //#region  Declare Variables
  response: getCitiesWithGovernorate[];
  Response_List: getCities[];
  Filtered_List: getCities[];
  Govern_id: number;
  Governorate_List: GetGovernorate[];

  //#endregion

  //#region constructor
  constructor(private citiesApiService: CitiesApiService,
    private governorateApiService: GovernorateApiService,
    private router: Router) { }
  //#endregion

  //#region  ng OnInit
  ngOnInit(): void {
    this.Response_List = [];
    this.getGovernoate();
    this.GetCities();
  }
  //#endregion

  //#region Consume API's

  //#region  get Governoate
  GetCities() {
    this.citiesApiService.GetCitiesWithGovernorate().subscribe(
      response => {
        this.response = response.data;
        // console.log("----- : ",this.response[0].governorate.title);
        
        this.Response_List = response.data;
        this.Filtered_List = response.data;
      },
      err => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
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
          
          this.citiesApiService.DeleteCities(id).subscribe(
            response => {
              this.GetCities();
              Swal.fire({
                icon: 'success',
                title: "تم حذف نوع المدينة بنجاح",
                showConfirmButton: false,
                timer: 1500
              })
            },
            err => {
              // Swal.fire({
              //   icon: 'error',
              //   title: 'خطأ',
              //   text: err.error,
              // })
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
    this.router.navigateByUrl("content/admin/insert-city");
  }
  //#endregion

  //#region Governoate
  update(cityid: number,governid: number, title: string) {
    this.citiesApiService.title = title;
    this.citiesApiService.GovernorateId = governid;
    localStorage.setItem("Governoratetitle",title);
    localStorage.setItem("GovernorateId",JSON.stringify(governid));
    this.router.navigate(['content/admin/update-city', cityid]);
  }
  //#endregion

  //#region Selected Governorate
  SelectedGovernorate(event: any) {
    this.Govern_id = event.target.value;
    if (event.target.value == -1)
      this.Filtered_List = this.Response_List;
    else
      this.Filtered_List = this.Response_List.filter(x => x.governorateId == event.target.value);
  }
  //#endregion

  //#region  get Governoate
  getGovernoate() {
    this.governorateApiService.GetGovernorate().subscribe(
      response => {
        this.Governorate_List = response.data;
        // response.data.forEach(element => {
        //   this.Governorate_List[element.id] = element.title;
        // });
      },
      err => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'خطأ',
        //   text: err.error,
        // })
      }
    )
  }
  //#endregion


}
