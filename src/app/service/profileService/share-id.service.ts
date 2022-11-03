import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareIdService {
  private id: string;
  private email: string;
  constructor() { }

  public shareId(){
    return this.id;
  }

  public setId(id: string){
    this.id = id;
  }

  public shareEmail(){
    return this.email;
  }

  public setEmail(email: string){
    this.email = email;
  }
}
