import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading: boolean = false;
  searchForm: FormGroup;
  Banks: BANK[] = [];
  dataSource = new MatTableDataSource<BANK>();
  tableColumns: string[] = [
    'address',
    'bank_name',
    'branch',
    'city',
    'state'
  ]

  constructor(
    public api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    public bankService: BankService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      city: new FormControl(this.cities[0],{ updateOn: 'blur'}),
      query: new FormControl(null, { updateOn: 'blur'})
    })

    this.fetchBanks(this.searchForm.get('city').value);
    this.onCityChange();
    this.onSearchQueryChange();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onCityChange(): void {
    this.searchForm.get('city').valueChanges.subscribe((val) => {
      console.log(val);
      this.searchForm.get('query').reset();
      this.fetchBanks(val);
    })
  }

  onSearchQueryChange(): void {
    this.searchForm.get('query').valueChanges.subscribe((val) => {
      if(val) {
        console.log(val);
        this.filterBanks(val);
      } else {
        this.filterBanks('');
      }
    })
  }

  filterBanks(query: string): void {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  fetchBanks(city): void {
    this.loading = true;
    this.api.getBanksByCity(city).subscribe(res => {
      if(res.length > 0) {
        console.log(res);
        this.Banks = res;
        this.dataSource.data = res as BANK[];
      } else {
        console.log('Invalid City Name');
      }
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

  goToBankDetails(bank: BANK): void {
    console.log(bank);
    this.bankService.changeBank(bank);
    this.router.navigate(['/bank', bank.bank_id]);
  }

  cities: Array<string> = ['Delhi', 'Mumbai', 'Bangalore', 'Uttarkashi', 'Dehradun', 'Noida']

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
