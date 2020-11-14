import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import{userUrl} from 'src/app/config/api'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http: Http) { }

  addUserToDB(userdata:any){
    this.http.post(userUrl,userdata)
    .subscribe(data =>{
        console.log(data)
    })

    console.log('user is added to DB',userdata)
}


// Create product
/* create(product: Product): Promise<IProduct> {
  return this.http.post(this.productsUrl, product)
      .toPromise()
      .then(response => response.json())
      .catch(this.error);
} */

 // Error handling
 /* private error(error: any) {
  let message = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error(message);
}  */

}
