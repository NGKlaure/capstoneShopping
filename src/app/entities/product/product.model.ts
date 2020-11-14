export interface IProduct {
  _id?: string;
  id:number
  name: string;
  brand: string;
  description:string;
  imageUrl:string;
  price:number;
  
}

export class Product implements IProduct {
  constructor(
    public id:number,
    public name: string,
    public brand: string,
    public description:string,
    public imageUrl:string,
    public price:number,
    public _id?: string,
    
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.brand = brand;
    this.description=description;
    this.imageUrl=imageUrl;
    this.price=price;
    
  }
}