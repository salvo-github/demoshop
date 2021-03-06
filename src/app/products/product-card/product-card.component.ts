import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { UserService } from 'src/app/services/user.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() protected product: Product;
  protected isCurrentUserAdmin$: Observable<boolean>;
  public productMaxRating: number;
  public productInteractionType: number | null = null;

  public constructor(
    protected userService: UserService,
    protected productService: ProductsService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productMaxRating = this.productService.getProductMaxRating();
    this.isCurrentUserAdmin$ = this.userService.isCurrentUserAdmin();
  }

  protected navigateTo(...routeParams: (string | number)[]): void {
    this.router.navigate(routeParams, { relativeTo: this.activatedRoute });
  }

  protected onClearProductInteractionType(): void {
    this.productInteractionType = null;
  }
}
