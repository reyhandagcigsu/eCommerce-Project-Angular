// import { ProductResolverService } from './../../core/services/product-resolver.service';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AuthGuard } from './../../core/guards/auth.guard';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const parentRoutes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
];

const childRoutes: Routes = [
  {
    path: 'products',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full',
      },
      {
        path: 'category/:category',
        component: ProductListComponent,
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(parentRoutes),
    RouterModule.forChild(childRoutes),
  ],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
