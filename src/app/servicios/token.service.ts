import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router: Router) { }

  public setToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean{
    if(this.getToken()){
      return true;
    }
    return false;
  }

  public logIn(token: string){
    this.setToken(token);
    this.router.navigate(["/inicio"])
  }

  public logOut(){
    window.sessionStorage.clear();
    this.router.navigate(["/inicio"]);
  }

  private decodePayload(token:string){
    const payload= token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
}
