import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { NotFoundModule } from './not-found/not-found.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulesRoutingModule,

    ProductsModule,
    CartModule,
    LoginModule,
    SignupModule,
    NotFoundModule,
  ],
})
export class ModulesModule {}
