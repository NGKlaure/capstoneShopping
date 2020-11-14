import { environment } from 'src/environments/environment.prod';

export const baseUrl =environment.production? 'http://api/hv':'http?localhost:3000'
/* export const productsUrl='http://localhost:3000/products'
export const cartUrl='http://localhost:3000/carts'
export const wishlistUrl='http://localhost:3000/wishlists' */

// cd to db.json location
// To run  with the db.json server use: json-server db.json 
//then, open another terminal and run: ng serve

export const productsUrl='/api/products'
export const cartUrl='/api/carts'
export const wishlistUrl='/api/wishlists'

//cd to server.js location
//To run  with proxy config file use: node server.js
//Then run: ng serve --proxy-config proxy.config.json
