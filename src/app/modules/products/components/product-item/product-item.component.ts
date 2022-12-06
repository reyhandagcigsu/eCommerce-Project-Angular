import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product.model'; 

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {

  @Input() product: IProduct;
  @Input() index: number; 


  constructor() { }

  ngOnInit(): void {
  }

}

