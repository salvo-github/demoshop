import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducer';
import { UserService } from 'src/app/services/user.service';
import { ProductInteractionType } from 'src/app/shared/models/product-interaction-type.model';
import { RoutesRef } from 'src/app/shared/models/routes-ref.model';
import { Product } from '../../shared/models/product.model';
import { getProductsList } from '../store/products.reducer';
import * as ProductsActions from '../store/products.actions';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  public paginationLinks$: Observable<{ [s: string]: string }>;
  public products$: Observable<Product[]>;
  public isCurrentUserAdmin$: Observable<boolean>;
  public product: null | Product = null;
  public productInteractionType: null | number = null;

  public constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    this.products$ = this.store.pipe(select(getProductsList));

    this.isCurrentUserAdmin$ = this.userService.isCurrentUserAdmin();

    // this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
    //   const valuesForFiltering: { [s: string]: any } = {};
    //   for (const key of queryParamMap.keys) {
    //     valuesForFiltering[key] = queryParamMap.get(key);
    //   }

    //   this.fetchFilteredProducts(valuesForFiltering);
    // });
  }

  public getNewProductRoute(): string[] {
    return [RoutesRef.product, 'new'];
  }

  public createNewProduct(): void {
    this.product = new Product();
    this.productInteractionType = ProductInteractionType.edit;
  }

  public onProductToDelete(product: Product): void {
    this.product = product;
  }

  public onClearProductInteractionType(): void {
    if (this.productInteractionType === ProductInteractionType.delete) {
      this.store.dispatch(ProductsActions.fetchProducts({ params: {} }));
    }
    this.productInteractionType = null;
  }

  public onSetProductInteractionType(
    productInteractionType: null | number
  ): void {
    this.productInteractionType = productInteractionType;
  }
}
