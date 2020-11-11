import { Injectable } from '@angular/core';
import {Product} from '../models/product'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /*products=[
     {id:1,
    title:'ABC',
    description:''}
  ] 
  */ //we will replace this with a class representing DTO in MVC architecture
  //so in models we create our DTO product
 
    products=[
      new Product(1,'product 1','this is the first product',100),
      new Product(2,'product 2','this is the first product',150),
      new Product(3,'product 3','this is the first product',200),
      new Product(4,'product 4','this is the first product',110),
      new Product(5,'product 5','this is the first product',400),
      new Product(6,'product 6','this is the first product',300),
      new Product(7,'product 7','this is the first product',420)
    ]

  constructor() { }

  getProduct(): Product[]{
     //todo populate products from API and return an Observable
     //so we will have to do a dependency enjection in product-list-compoment.ts
    return this.products

  }
}
