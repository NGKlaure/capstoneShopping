import { Injectable } from '@angular/core';
import {userUrl} from 'src/app/config/api';
import { Http } from '@angular/http';
import{map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor( private http:Http) { }

  /* public login(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  } */

  getlogin(){
    return this.http.get(userUrl)
    
  }
}
