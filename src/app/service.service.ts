import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string;

  constructor(private http: HttpClient ) { 

  }

  images (formdata): Observable<any> {
    
    this.url = `${environment.apiHost}Sp_Get_Appimages_CA_1_0`;
    const httpPostOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(this.url,formdata, httpPostOptions2).pipe(
      map(res => {
               return JSON.stringify(res);
      }),
        );
    
    }
  GetList(formdata): Observable<any> {
    
    this.url = `${environment.apiHost}GetCustomerRegisteredByApp_1_0`;
    const httpPostOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(this.url,formdata, httpPostOptions2).pipe(
      map(res => {
        console.log("Response",res)
          return JSON.stringify(res);
      }),
        );
    
  }

}
