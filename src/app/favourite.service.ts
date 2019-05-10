import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor() { }

  fav: string = 'Favourites';

  markAsFavourite(bank: any): void {
    let favs: Array<any> = JSON.parse(localStorage.getItem(this.fav));
    if(favs === null) {
      favs = [];
    }
    if(!favs.find(x => x.bank_id === bank.bank_id)) {
      favs.push(bank);
    }
    localStorage.setItem(this.fav, JSON.stringify(favs));
  }

  isFavourite(bank: any): boolean {
    let favs: Array<any> = JSON.parse(localStorage.getItem(this.fav));
    if(favs === null){
      return false;
    }
    else{
      if(favs.find(x => x.bank_id === bank.bank_id)){
        return true;
      } else {
        return false;
      }
    }
  }

}
