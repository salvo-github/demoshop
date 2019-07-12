import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { LoginService } from 'src/app/user/login/login.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [
    './products-list.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.products.length) {
      this.products = this.route.snapshot.data.products;
    }
    console.log(this.loginService.isCurrentUserAdmin());
  }
}
