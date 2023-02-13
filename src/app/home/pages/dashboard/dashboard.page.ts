import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FingerPrintService } from 'src/app/services/finger-print.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { GetResult } from '@capacitor/preferences';

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
    public router: Router) { }


  async ngOnInit(): Promise<void> {
   const response = await this.preferenceService.get('data');
   const image = await this.preferenceService.get('img');
  

    this.img = image.value? image.value : '' ;
    this.data = response.value ? JSON.parse(response.value) : null;
    console.log(this.data);
    
  }


}
