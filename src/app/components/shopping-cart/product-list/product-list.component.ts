import { Component, OnInit } from '@angular/core';
import {ProductService} from 'src/app/services/product.service';// is global singletton 
//so we need to refer this by using depency injection
//better way to call the src folder to import is to start at scr/app 
import {Product} from 'src/app/models/product'
import { WishlistService } from 'src/app/services/wishlist.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[]=[]
  wishlist:number[]=[]

  // calling in the constructor is dependencies injection
  constructor( private productService:ProductService,
    private wishlistService:WishlistService) { }

  ngOnInit(): void {
    //this.productList= this.productService.getProduct() // use wen getting data from produts array in product.service
     this.loadProduct()
     this.loadWishlist()
  }
  loadProduct(){
    this.productService.getProducts().subscribe((products)=>{
      this.productList=products
    })
  }
  loadWishlist(){
    this.wishlistService.getWishlist().subscribe(productIds =>{
      this.wishlist=productIds
    })
  }

}
