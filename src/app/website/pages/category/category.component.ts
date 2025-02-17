import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  template: `<app-products [products]="products" (loadMore)="onLoadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryId:string|null=null;
  limit = 10;
  offset = 0;
  products: Product[] = [];

  constructor(private route: ActivatedRoute,
              private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.categoryId = params.get('id');
        if(this.categoryId){
          return this.productsService.getByCategory(this.categoryId,this.limit,this.offset)
          // .subscribe((data) => {
            // this.products=data;
          // });
       }
       return [];
      }),  
    )
    .subscribe((data) => {
          this.products=data;
          // console.log(data);
        });
      }

onLoadMore() {
    if(this.categoryId){
        this.productsService.getByCategory(this.categoryId, this.limit,this.offset)
        .subscribe((data) => { this
          this.products = this.products.concat(data);
          this.offset += this.limit;
        });
      }      
    }
}
