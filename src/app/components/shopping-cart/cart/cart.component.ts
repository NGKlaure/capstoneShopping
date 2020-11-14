import { Component, OnInit,Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import{MessengerService} from 'src/app/services/messenger.service'
import { Http } from '@angular/http';
import{CartItem} from 'src/app/models/cart-item'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() productItem:Product
  @Input() addedToWishlist:boolean
cartItems=[
 /*  {id:1, produtId:1,productName:'test1', qty:2,price:100},
  {id:2, produtId:2, productName:'test2',qty:1,price:100},
  {id:3, produtId:3, productName:'test3',qty:3,price:100},
  {id:4, produtId:4, productName:'test4',qty:4,price:100} */
];
cartTotal=0;

  constructor(private msg:MessengerService,
    private cartService:CartService) { }

  ngOnInit() {
    this.handleSubscription()
    this.loadCartItems()
  }

  handleSubscription(){
    this.msg.getMsg().subscribe((product:Product)=>{
      //this.addProductToCard(product)
      this.loadCartItems()
    })
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe((items:CartItem[])=>{
      this.cartItems=items
      this.calculateCartTotal()
    })

  }

  calculateCartTotal(){
    this.cartTotal=0
    this.cartItems.forEach(item=>{
      this.cartTotal +=(item.qty * item.price)
    })
  }

  handleDeleteFromCart(){
    console.log(' id ies' +this.productItem)
  this.cartService.removeFromCart(this.productItem.id).subscribe(()=>{
    //console.log(this.productItem)
    
  })
}

 /*  handleDeletefromCart(id: string) {
    this.cartService.removeFromCart(id).then((result: any) => this.loadCartItems());
  } */

  
}
