import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { UserService } from 'src/app/user/user.service';
import { RoutesRef } from 'src/app/routes-ref.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private paginationLinksSubject: BehaviorSubject<{ [s: string]: string }>;
  private paginationLinksSubscription: Subscription;
  private fetchProductsSubscription: Subscription;
  private onDeleteSubjectSubscription;

  public products: Product[];
  public paginationLinks: { [s: string]: string };
  public isCurrentUserAdmin = false;

  public constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userService: UserService
  ) {}

  public ngOnInit() {
    if (this.route.snapshot.data.products.length) {
      this.products = this.route.snapshot.data.products;
    }

    this.route.queryParamMap.subscribe((queryParamMap: ParamMap) => {
      const valuesForFiltering: { [s: string]: any } = {};
      for (const key of queryParamMap.keys) {
        valuesForFiltering[key] = queryParamMap.get(key);
      }

      this.fetchFilteredProducts(valuesForFiltering);
    });

    this.getPaginationLinks();

    this.getCurrentUserRole();

    this.onDeleteSubjectSubscription = this.productsService
      .getOnDeleteSubject()
      .subscribe((deletedProduct: Product) => {
        this.products = this.products.filter((product: Product) => {
          if (product.id === deletedProduct.id) {
            return false;
          }
          return true;
        });
      });
  }

  public ngOnDestroy() {
    if (this.paginationLinksSubscription) {
      this.paginationLinksSubscription.unsubscribe();
    }
    if (this.onDeleteSubjectSubscription) {
      this.onDeleteSubjectSubscription.unsubscribe();
    }
    if (this.fetchProductsSubscription) {
      this.fetchProductsSubscription.unsubscribe();
    }
  }

  public fetchFilteredProducts(
    valuesForFiltering: { [s: string]: any },
    url?: string
  ): void {
    this.fetchProductsSubscription = this.productsService
      .fetchProducts(valuesForFiltering, url)
      .subscribe((productsData: Product[]) => {
        this.products = productsData;
      });
  }

  public getPaginationLinks(): void {
    this.paginationLinksSubject = this.productsService.getPaginationLinksSubject();

    this.paginationLinksSubscription = this.paginationLinksSubject.subscribe(
      (paginationLinks) => {
        this.paginationLinks = paginationLinks;
      }
    );
  }

  public getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }

  public getNewProductRoute(): string[] {
    return [RoutesRef.product, 'new'];
  }
}
