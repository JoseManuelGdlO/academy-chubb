import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './pages/home/home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../components/shared.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'; 
import { DashboardPage } from './pages/dashboard/dashboard.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    HomePageRoutingModule
  ],
  providers: [
    NativeGeocoder
  ],
  declarations: [HomePage, DashboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
