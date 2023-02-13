import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FingerPrintService } from 'src/app/services/finger-print.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  result: any[] = [{ administrativeArea: '', addressLines: [], areasOfInterest: [], countryCode: '', countryName: '', latitude: '', longitude: '', locality: '', postalCode: '', subAdministrativeArea: '', subLocality: '', subThoroughfare: '', thoroughfare: '' }];

  data = {
    name: '',
    lastname: '',
    secondlastname: '',
    birthdate: '',
    age: '',
  }

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap: GoogleMap | undefined;

  constructor(
    private nativeGeocoder: NativeGeocoder,
    public fingerPrint: FingerPrintService,
    public preferenceService: PreferencesService,
    public router: Router) { }


  ngOnInit(): void {
    this.startMap();
  }

  async getPermisisonsGeolocation() {
    await Geolocation.requestPermissions();
    this.startMap();
  }

  async startMap() {

    const permissions = await Geolocation.checkPermissions();
    if (permissions.location !== 'granted') {
      this.getPermisisonsGeolocation();
    }

    const coordinates = await Geolocation.getCurrentPosition();

    this.newMap = await GoogleMap.create({
      id: 'capacitor-google-maps',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 18,
      },
      forceCreate: true
    });


    await this.newMap.setCamera({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      }
    })

    await this.newMap.addMarker({
      coordinate: {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      }
    });

    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.result = await this.nativeGeocoder.reverseGeocode(coordinates.coords.latitude, coordinates.coords.longitude, options)


  }

  async continue() {
    const verified = await this.fingerPrint.auth()

    if (!verified) return;

    console.log(this.data);
    await this.preferenceService.set('data', JSON.stringify(this.data))
    this.newMap?.destroy();
    this.router.navigateByUrl('photo')
  }

}
