import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankService } from '../bank.service';
import { FavouriteService } from '../favourite.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.scss']
})
export class BankDetailComponent implements OnInit {
  
  bankId: number;
  bank: BANK;
  isFav: boolean;

  constructor(
    private route: ActivatedRoute, 
    public bankService: BankService,
    public favService: FavouriteService) { }
  
  ngOnInit() {

    this.getCurrentBank();
    
  }

  markAsFavourite(): void {
    this.favService.markAsFavourite(this.bank);
    this.isFavourite();
  }

  isFavourite(): void {
    this.isFav = this.favService.isFavourite(this.bank);
    console.log(this.isFav);
  }

  getCurrentBank(): void {
    this.bankService.currentBank.subscribe((bank: BANK) => {
      console.log(bank);
      this.bank = bank;
      this.isFavourite();
    })
  }

  getBankId(): void {
    this.route.params.subscribe(params => {
      this.bankId = +params['id'];
      console.log('Bank Id: ', this.bankId);
    })
  }

}

interface BANK {
  address: string,
  bank_id: number,
  bank_name: string,
  branch: string,
  city: string,
  district: string,
  ifsc: string,
  state: string
}
