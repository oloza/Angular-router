## MyStoreRouter
# Create routes
 we divide the project components only componentes and pages for template html
 this tag allow us render our pages inside
 <router-outlet></router-outlet> 
before all, we need to import the componentes in the header
    import { CategoryComponent } from './pages/category/category.component';
in the array of components we must add these components
    const routes: Routes = [{path:'home', component: HomeComponent},...]

# home page
 add selector app-product in the app.component.html
 in the router for load firstly the home page we must add in:
    {path:'', component: HomeComponent}
or redirect
    {path:'', redirectTo: '/home', pathMatch: 'full'}
refactoring app.products 
its necessary to import an "Input"  from '@angular/core'; 
we don't need the ngOnInit
 

