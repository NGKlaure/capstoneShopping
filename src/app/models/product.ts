export class Product {
    id:number;
    name:string;
    description:string;
    price:number;
    imageUrl:string;
    constructor(id,name, description='',price=0,imageUrl='https://th.bing.com/th/id/OIP.uBUEh8q4UlgxCc2FhuSPigHaGL?pid=Api&rs=1'){
        this.id=id
        this.name=name
        this.description=description
        this.price=price
        this.imageUrl=imageUrl

    }
}
