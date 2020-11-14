import { Component, OnInit,Input, OnChanges} from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  // If new product created, we add it to the list.
  ngOnChanges(): void {
    if (this.productToDisplay !== null) {
      this.products.push(this.productToDisplay);
    }
  }

  // Load all products.
  private loadAll() {
    this.productService
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
      });
  }

  // Delete a product. 
  delete(id: string) {
    this.productService.delete(id).then((result: any) => this.loadAll());
  }

}
