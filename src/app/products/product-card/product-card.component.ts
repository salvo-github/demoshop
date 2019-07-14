import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [
    './product-card.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() parentComponent: string;
  isCurrentUserAdmin = false;
  productAvailability: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.getCurrentUserRole();

    this.setProductAvailability();
  }

  getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }

  setProductAvailability(): void {
    const productQuantity = this.product.count - this.product.soldCount;
    this.productAvailability =
      productQuantity > 0 ? `${productQuantity} items left` : 'Sold Out';
  }
}
