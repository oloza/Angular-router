import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './components/nav/nav.component';
import {SharedModule} from './../shared/shared.module'
import { HomeComponent } from './pages/home/home.component';

import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';

import { WebsiteRoutingModule } from './website-routing.module';
import { SwiperModule } from 'swiper/angular';
import { share } from 'rxjs';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
  declarations: [
        NavComponent,
        HomeComponent,
        MyCartComponent,
        LoginComponent,
        RecoveryComponent,
        ProfileComponent,
        ProductDetailComponent,
        LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class WebsiteModule { }
