import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct, Product } from 'src/app/entities/product/product.model';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  id:number=0;
  name: string = '';
  brand: string = '';
  description: string='';
  imageUrl: string = '';
  price: number=10;
  error: boolean = false;

  @Output() createdProduct = new EventEmitter<IProduct>();

  constructor(protected productService: ProductService, protected formBuilder: FormBuilder) { }

  

  ngOnInit(): void {
    this.initForm();
  }

  // Manage the submit action and create the new product.
  onSubmit() {
    const product = new Product(
      this.productForm.value['id'],
    this.productForm.value['name'],
    this.productForm.value['brand'],
    this.productForm.value['description'],
    this.productForm.value['imageUrl'],
    this.productForm.value['price'],
     null);
    this.productService.create(product).then((result: IProduct) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.createdProduct.emit(result);
      }
    });
  }

  // Hide the error message.
  hideError() {
    this.error = false;
  }

  // Init the creation form.
  private initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(this.id, Validators.required),
      name: new FormControl(this.name, Validators.required),
      brand: new FormControl(this.brand, Validators.required),
      description: new FormControl(this.description, Validators.required),
      imageUrl: new FormControl(this.imageUrl, Validators.required),
      price: new FormControl(this.price, Validators.required)
    });
  }
  
}
