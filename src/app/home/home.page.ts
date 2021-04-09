import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ImageResponse: any;
  img: any;
  url: string;
  itemListData = [];
  page_number = 1;
  page_limit = 8;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  list: any;
  dataliste: any;
  constructor( private toastCtrl: ToastController, private http:ServiceService ,private nativeStorage: NativeStorage  ) {
 
    nativeStorage.setItem('name', 'Max');
   }
 
  ngOnInit() {

    this.Getlist(false, "")
    const payload = new HttpParams()
    .set('UserId', '75')
      return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      this.http.images(payload).subscribe((res) => {
        this.ImageResponse = JSON.parse(res)

        this.img = this.ImageResponse['data1']
        console.log("response", this.ImageResponse )
        }),
        (err) => {
          reject(err);
        };
    });
 
  }
  Getlist(isFirstLoad, event) {
    console.log("onginoit",isFirstLoad, event)
    const payload = new HttpParams()
    .set('UserId', '75')
    .set('PageNo',`${this.page_number}`);
    return new Promise((resolve, reject) => {
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      this.http.GetList(payload).subscribe((res) => {
        this.list =JSON.parse(res)
        this.dataliste =this.list['data1']
        console.log("respons  data1", this.list['data1'])
        let data =  this.dataliste.sort((a,b) => 0 - (a.SrNo > b.SrNo ? -1 : 1));
        console.log("Short",data)
        for (let i = 0; i < this.dataliste.length; i++) {
          this.itemListData.push( data[i]);
        }

        if (isFirstLoad)
          event.target.complete();

        this.page_number++;
      
        }),
     
        (err) => {
          reject(err);
        };
    });
  }
  doInfinite(event) {
    this.Getlist(true, event);
    
  }

  ionViewWillLeave() {

  }
 
  Savedata(data){ console.log(data) , 
    
    Swal.fire({
      title: 'Do you want to save this Data in local Database?',
      
      showCancelButton: true,
      confirmButtonText: `Yes`,
      }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.nativeStorage.setItem('Savedata', {Name: `${data.FName} ${data.MName} ${data.LName}`, VillageName: `${data.VillageName}`, Route:`${data.RouteName}`})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }
 
}
