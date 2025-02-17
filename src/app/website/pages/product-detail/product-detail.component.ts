import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService,
              private location: Location
  ) { }

  productId: string| null=null;
  product:Product | null =null;

  ngOnInit(): void {
        this.route.paramMap
        .pipe(
          switchMap(params => {
            this.productId = params.get('id');
            if(this.productId){
              return this.productsService.getOne(this.productId)
              // .subscribe((data) => {
                // this.products=data;
              // });
           }
           return [null];
          }),  
        )
        .subscribe((data) => {
              this.product=data;
              // console.log(data);
            });
  }
  goToBack(){
    this.location.back();
  }
}
function routerLinkNavigate(arg0: string[]) {
  throw new Error('Function not implemented.');
}

