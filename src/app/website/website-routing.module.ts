import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{LayoutComponent} from './components/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {path:'', component:LayoutComponent,
    children:[
     {path:'', redirectTo:'/home', pathMatch: 'full'},
     {path:'home', component: HomeComponent},
     {path:'category',
      loadChildren:()=>import('./pages/category/category.module').then(m=>m.CategoryModule)
      },
     {path:'product/:id', component: ProductDetailComponent},
     {path:'my-cart', component: MyCartComponent},
     {path:'login', component: LoginComponent},
     {path:'recovery', component: RecoveryComponent},
     {path:'profile', component: ProfileComponent},
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
