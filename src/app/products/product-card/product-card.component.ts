import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Product } from '../../shared/models/product.model';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    protected productService: ProductsService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {
    this.getCurrentUserRole();
  }

  public getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }

  public getProductMaxRating(): number {
    return this.productService.getProductMaxRating();
  }

  protected navigateTo(...routeParams: (string | number)[]): void {
    this.router.navigate(routeParams, { relativeTo: this.activatedRoute });
  }
}
