import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() protected product: Product;
  protected isCurrentUserAdmin = false;

  public constructor(
    protected userService: UserService,
    protected productService: ProductsService
  ) {
    this.getCurrentUserRole();
  }

  public getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }

  // used to delete a product from product list page
  public onDeleteHandler($event: MouseEvent): void {
    this.productService.setCurrentProduct(this.product);
    $event.stopPropagation();
  }
}
