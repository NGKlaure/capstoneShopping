import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createdProduct: IProduct = null;
  constructor() { }

  ngOnInit(): void {
  }
  // Get the new product created.
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }

}
