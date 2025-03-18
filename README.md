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

# vistas anidadas
rutas anidadas tenemos nuestro 
<app-nav></app-nav>   fijo nuetro header
<router-outlet></router-outlet>
vemos como podemos cambiar el app-nav según navegacion
quitamos en nav-bar de app.component.html y lo llevamos a layout.component.html
al tener una linea en app.component.html lo ponemos como template en el componente
eliminamos el app.componente.html

# Creando un CMS Module
creamos un content management system
el flag --routing nos permite crear un modulo con rutas
`ng g m cms --routing`
create component tasks
`ng g c cms/pages/tasks`
`ng g c cms/pages/grid`
`ng g c cms/components/layout`

el cms routing.module.ts tiene el import con `RouterModule.forChild(routes)`
son modulos del tipo feature
importar el modulo en el path:

habilita a acer lazy loading y code splitting
loadChildren:()=>import('./cms/cms.module').then(m=>m.CmsModule)

# Creando en Website Module 
ng g m website --routing
"un componente sólo puede pertenecer a un modulo "
para cargar 
 {path:'',
    loadChildren:()=>import('./website/website.module').then(m=>m.WebsiteModule)
   },

# Creando un Shared Module 
incluir los componentes que otros modulos quieren compartir entre sí
ng g m shared   no tiene routing
en el módulo importar y exportar los componentees.

# Precarga de modulos
creamos un nuevo modulo para category

ng g m website/pages/catagory --routing
esta bien modularizar y usar lazy loading
pero en redes lentas tiene sus desventajas ya que al utilar el path del modulo este cargará dependiendo
la velocidad de internet.

# AlModules & CustomStrategy
descargar,parsear,compilar y ejecutar
aprovechar la descarga y en el tiempo libre descargar los otros modulos
despues del render inicial precarga los módulos
para habilitar la precarga ir a app-routing (forRoot)
import PreloadAllModules
    import {PreloadAllModules } from '@angular/router';
en la directiva @NgModule agregar: preloadingStrategy:PreloadAllModules
  @NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules
  })]
con modulos pequeños funciona, be carefull with project with too much modules

para cargas personalizadas:
creamos un servicio y en el servicio implementamos el PreloadingStrategy
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        if(route.data && route.data['preload']){
        return load();
        }
        return of(null);
    }

y lo implementamos en la rutas
    path:...
    loadChildren:...
    data:{
        preload:true,
    }
tambien cargar el customPreloadServices
@ngModule({
    imports:[RouterModule.forRoot(routes,{
    preloadingStrategy:CustomPreloadService
    })],
    exports:[RouterModule]
})

recomandacion:

preloadAllModules-> pocos chunks
customStrategy -> varios chunks
