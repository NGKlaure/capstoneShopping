import { Component, OnInit,Input } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
const cartUrl='/api/carts'
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
@Input() cartItem:CartItem;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

     handleDeleteFromCart(){
      console.log(' productId is ' +this.cartItem.productId)
      console.log(' id is' +this.cartItem.id)
      console.log(cartUrl + '/' + this.cartItem.productId)
    this.cartService.removeFromCart(this.cartItem.id).subscribe(()=>{
      console.log(this.cartItem)
      
    }) 

  } 

}
