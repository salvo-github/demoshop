import { Component, Input, OnInit } from '@angular/core';
import { RoutesRef } from 'src/app/routes-ref.model';
import { UserService } from 'src/app/user/user.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() parentComponent: string;
  isCurrentUserAdmin = false;
  onBuying = false;
  RoutesRef = RoutesRef;

  constructor(
    private userService: UserService,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.getCurrentUserRole();
  }

  getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }

  getProductAvailability(): number {
    return this.product.count - this.product.soldCount;
  }

  // used to delete a product from product list page
  onDeleteHandler($event) {
    this.productService.setCurrentProduct(this.product);
    $event.stopPropagation();
  }
}
