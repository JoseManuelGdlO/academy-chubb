import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { environment } from 'src/environments/environment';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { FingerPrintService } from 'src/app/services/finger-print.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  result: any[] = [{ administrativeArea: '', addressLines: [], areasOfInterest: [], countryCode: '', countryName: '', latitude: '', longitude: '', locality: '', postalCode: '', subAdministrativeArea: '', subLocality: '', subThoroughfare: '', thoroughfare: '' }];
  @ViewChild(RouterOutlet) outlet!: RouterOutlet;
  data = this.formBuilder.group({
    name: '',
    lastname: '',
    secondlastname: '',
    birthdate: '',
    age: '',
  });
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap: GoogleMap | undefined;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private nativeGeocoder: NativeGeocoder,
    public fingerPrint: FingerPrintService,
    public preferenceService: PreferencesService,
    public router: Router) { }


  ngOnInit(): void {
      this.router.events.subscribe(e => {
        if (e instanceof ActivationStart && e.snapshot.outlet === "photo")
          this.outlet.deactivate();
      });
    this.startMap(); 
    this.getSession()
  }

  async getSession() {
    const response: string | null = (await this.preferenceService.get('data')).value
    if(!response){
      this.data = this.formBuilder.group({
        name: '',
        lastname: '',
        secondlastname: '',
        birthdate: '',
        age: '',
      });
      return
    }

    const session = JSON.parse(response);

      this.data.controls.name.setValue(session.name)
      this.data.controls.lastname.setValue(session.lastname)
      this.data.controls.secondlastname.setValue(session.secondlastname)
      this.data.controls.birthdate.setValue(session.birthdate)
      this.data.controls.age.setValue(session.age)

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

    if( this.isLoading){
      return
    }
    if(!this.data.valid) {
      this.data.markAllAsTouched();
      (await this.toastController.create({duration: 1000, message: 'Faltan datos por completar', position: 'bottom'})).present();
      return
    }
    this.isLoading = true;
    const verified = await this.fingerPrint.auth()

    if (!verified) return;

    console.log(this.data);

    const item = {
      name: this.data.controls.name.value,
      lastname:  this.data.controls.lastname.value,
      secondlastname:  this.data.controls.secondlastname.value, 
      birthdate:  this.data.controls.birthdate.value,
      age:  this.data.controls.age.value, 
    }
    await this.preferenceService.set('data', JSON.stringify(item))
    this.newMap?.destroy();
    this.router.navigateByUrl('photo') 
  }

}
