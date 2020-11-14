import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import{HttpClient}from'@angular/common/http'
import{ Observable} from 'rxjs';
import{cartUrl} from 'src/app/config/api'
import { Product } from '../models/product';
import{ map} from 'rxjs/operators';
import { Http } from '@angular/http';
//const cartUrl='/api/carts'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCartItems():Observable<CartItem[]>{
    //todo>Mapping the obtainresult to our cartItem prop 
    //using pipe() and map()
    return this.http.get<CartItem[]>(cartUrl).pipe(
      map((result:any[])=>{
        let cartItems:CartItem[]=[]
        for (let item of result){
          let productExist=false
    for(let i in cartItems){
      if(cartItems[i].productId===item.product.id){
        cartItems[i].qty++
        productExist=true
        break;
      }

    }
    if(!productExist){
      cartItems.push(new CartItem(item.id,item.product))
    }
  }
        return cartItems
      })
    );

  }

  addProductToCart(product:Product):Observable<any>{
    return this.http.post(cartUrl,{product})
  }
  
   removeFromCart(productId){
     console.log(cartUrl + '/' + productId)
    return this.http.delete(cartUrl + '/' + productId)
  } 

  
}
