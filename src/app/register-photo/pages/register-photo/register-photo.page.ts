import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Browser } from '@capacitor/browser';
import { FingerPrintService } from 'src/app/services/finger-print.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-photo',
  templateUrl: 'register-photo.page.html',
  styleUrls: ['register-photo.page.scss'],
})
export class RegisterPage {

  imageUrl: string = '';
  isAceptedTerms = false;

  constructor(
    public preferensesService: PreferencesService,
    public fingerPrintService: FingerPrintService,
    public router: Router
  ) {
    console.log('hola');
    
  }

  async takePicture () {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.dataUrl ? image.dataUrl : '';
  };

  async openTerms() {
    await Browser.open({ url: 'https://www.termsandcondiitionssample.com/' });
  }

  changeToggle(value: any) {
    console.log(value);
    
    this.isAceptedTerms = !this.isAceptedTerms

  }

  async finish() {

    if(!this.isAceptedTerms) {
      return
    }
    const verified = await this.fingerPrintService.auth()
    if(!verified) return

    this.preferensesService.set('img', this.imageUrl);
    this.router.navigateByUrl('home/dashboard')
  }

}
