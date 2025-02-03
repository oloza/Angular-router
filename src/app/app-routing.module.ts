import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CategoryComponent } from './pages/category/category.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'category/:id', component: CategoryComponent},
  {path:'my-cart', component: MyCartComponent},
  {path:'login', component: LoginComponent},
  {path:'recovery', component: RecoveryComponent},
  {path:'profile', component: ProfileComponent},
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
