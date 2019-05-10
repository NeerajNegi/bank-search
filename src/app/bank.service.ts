import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private bankSource = new BehaviorSubject({});
  currentBank = this.bankSource.asObservable();

  constructor() { }

  changeBank(bank: any) {
    this.bankSource.next(bank)
  }

}
