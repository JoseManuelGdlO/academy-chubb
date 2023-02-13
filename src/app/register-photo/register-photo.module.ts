import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../components/shared.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'; 
import { RegisterPhotoPageRoutingModule } from './register-photo.routing.module';
import { RegisterPage } from './pages/register-photo/register-photo.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RegisterPhotoPageRoutingModule
  ],
  providers: [
    NativeGeocoder
  ],
  declarations: [RegisterPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegisterPhotoModule {}
