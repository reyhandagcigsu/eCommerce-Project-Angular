import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { RouterModule } from '@angular/router';


import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductItemComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductsComponent,

  ],
  imports: [
  CommonModule,
    ProductsRoutingModule,
    NgbModule,
    SharedModule,
    RouterModule
  ]
})
export class ProductsModule { }
