import { Injectable } from '@angular/core';
import { SubItem } from '../models/subItem';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public scope?: any;
   
  constructor() {
  }

  public getScope() {
      return this.scope;
  }

  public setScope(scope: any): void {
      this.scope = scope;
  }

  public resetScope(){
    this.scope = "";
  }
}

