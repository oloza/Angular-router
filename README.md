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

# category page
products.component.html
   <button (click)="onLoadMore()">Load more</button>
products.component.ts
    @Output() loadMore = new EventEmitter();
    onLoadMore() {
      this.loadMore.emit();
    }
home.component.html
   <app-products [products]="products" (loadMore)="onLoadMore()"></app-products>
home.component.ts
    onLoadMore() {
        this.productsService.getAll(this.limit, this.offset).subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
        });
    }
 in the router category add "id" parameter 
    category/:id
 for parameter we must add ActivateRoute from @angular/router
    import { ActivatedRoute } from '@angular/router';

# routerLink and routerActive
routerLink='/home'
[routerLInk]="['/category',item.id]"     `dinamic way`

    class="active"
    routerLinkActive="active"

# ruta 404
    at the end of router
    path:'**', component: NotFoundComponent

# detalle de cada producto
 -for navigate back we can use navigate
 import {location} from '@angular/common';
 -in the procedure:
 this.location.back();
 # parametros URL
 -son opcionales
 -vienen adjuntos en la Url
 import {ActivatedRoute} from '@angular/router';
 ...
 constructor(private route: ActivatedRoute) {}
 ngOnInit() {
    ...
    this.route.queryParamMap.subscribe..
en products.component.ts
-la propiedad set hace que se monitorice todo el tiempo
      @Input() set productId: string | null = null;

<a routerLink="/home" [queryParams]="{product:product.id}">Ver detalle</a>
añade el routerLink="." para que vaya la opcion de queryParams  
<a routerLink="." [queryParams]="{product:product.id}">Ver detalle</a>

# Lazy Loading y programacion modular
vendor.js `todos los providers librerias`
main.js  `toda la logica`
runtime.js `interno de Angular` 
polyfills.js `para funcionar en algunos navegadores`

 `code splitting`
 -tenemos un empaquetador(rollup, webpack, etc):
    -tiene que transpilar
    -transformar sass a css
    -imagenes las comprime y les pone un hash
-webpack
    todos los archivos TS los lleva a MainJS

-code splitting es no tener todos los TS en un MainJS
-pone todos ls archivos en un Chunk JS
-cada chunk va cargarse por separado

# programacion modular
un módulo puede estar compuesto por:
    *componentes
    *directivas
    *interceptros
    *models
    *pages
    *pipes
    *services
el NgModule
@NgModule({
  imports: [BrowserModule],  --importamos modulos 
  provides: [Logger]  --los servicios
  declarations: [AppComponent]--componentes,pipes, directivas
  exports:[AppComponent]    --si deseas que el modulo sirva a otros modulos
  bootstrap: [AppComponent]  -- solo lo tiene el modulo principal
-Existen tipos de modulos
    *Root Module  --modulo por deault en Angular
    *Core Module  --gralmente van servicios
    *Routing Module --para los routings
    *Feature/Domain Module --valor o p
    *Shared Module -- se utilizan más para componentes, pipes y directivas




