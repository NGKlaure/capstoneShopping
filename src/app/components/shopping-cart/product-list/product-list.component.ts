import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';// is global singletton 
//so we need to refer this by using depency injection
//better way to call the src folder to import is to start at scr/app 
import {Product} from 'src/app/models/product'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[]=[]

  // calling in the constructor is dependencies injection
  constructor( private productService:ProductService) { }

  ngOnInit(): void {
    this.productList= this.productService.getProduct()
  }

}
