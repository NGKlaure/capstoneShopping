import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import{MessengerService} from 'src/app/services/messenger.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cartItems=[
 /*  {id:1, produtId:1,productName:'test1', qty:2,price:100},
  {id:2, produtId:2, productName:'test2',qty:1,price:100},
  {id:3, produtId:3, productName:'test3',qty:3,price:100},
  {id:4, produtId:4, productName:'test4',qty:4,price:100} */
];
cartTotal=0

  constructor(private msg:MessengerService) { }

  ngOnInit() {
    this.msg.getMsg().subscribe((product:Product)=>{
      this.addProductToCard(product)
    })
  }

  addProductToCard(product:Product){
    let productExist=false
    for(let i in this.cartItems){
      if(this.cartItems[i].productId===product.id){
        this.cartItems[i].qty++
        productExist=true
        break;
      }

    }
    if(!productExist){
      this.cartItems.push({
        productId:product.id,
        productName:product.name,
        qty:1,
        price:product.price
      })
    }

  
    this.cartTotal=0
    this.cartItems.forEach(item=>{
      this.cartTotal +=(item.qty * item.price)
    })
  }

}
