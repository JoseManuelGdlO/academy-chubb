import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FingerPrintService } from 'src/app/services/finger-print.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { GetResult } from '@capacitor/preferences';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  data: any;
  img!: string;

  constructor(
    public preferenceService: PreferencesService,
    public toastController: ToastController,
    public router: Router) { }


  async ngOnInit(): Promise<void> {
   const response = await this.preferenceService.get('data');
   const image = await this.preferenceService.get('img');
  

    this.img = image.value? image.value : '' ;
    this.data = response.value ? JSON.parse(response.value) : null;
    console.log(this.data);
    
  }


  async downloadImage() {
    await Filesystem.writeFile({
      path: 'image-academy.jpg',
      data: this.img.split(',')[1],
      directory: FilesystemDirectory.Documents
    });
    (await this.toastController.create({duration: 1000, color:'success', message: 'Imagen descargada, revisa tu galeria', position: 'bottom'})).present();
    const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
     reader.readAsDataURL(blob);
    });
    
    
  }

  async  delete() {
    await this.preferenceService.remove('data');
    await this.preferenceService.remove('img');
    (await this.toastController.create({duration: 1000, color:'danger', message: 'Registro eliminado', position: 'bottom'})).present();
    this.router.navigateByUrl('home');
  }


}
