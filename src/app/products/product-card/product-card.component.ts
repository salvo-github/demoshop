import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/user/user.service';

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

  constructor(private router: Router, private userService: LoginService) {}

  ngOnInit() {
    this.getCurrentUserRole();
  }

  getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }
}
