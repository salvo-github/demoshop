import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
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
  products: Product[];

  paginationLinksSubject: BehaviorSubject<{ [s: string]: string }>;
  paginationLinksSubscription;
  paginationLinks: { [s: string]: string };

  onDeleteSubjectSubscription;

  isCurrentUserAdmin = false;

  RoutesRef = RoutesRef;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private userService: UserService
  ) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.paginationLinksSubscription.unsubscribe();
    this.onDeleteSubjectSubscription.unsubscribe();
  }

  fetchFilteredProducts(
    valuesForFiltering: { [s: string]: any },
    url?: string
  ) {
    this.productsService
      .fetchProducts(valuesForFiltering, url)
      .subscribe((productsData: Product[]) => {
        this.products = productsData;
      });
  }

  getPaginationLinks() {
    this.paginationLinksSubject = this.productsService.getPaginationLinksSubject();

    this.paginationLinksSubscription = this.paginationLinksSubject.subscribe(
      (paginationLinks) => {
        this.paginationLinks = paginationLinks;
      }
    );
  }

  getCurrentUserRole(): void {
    this.isCurrentUserAdmin = this.userService.isCurrentUserAdmin();
  }
}
