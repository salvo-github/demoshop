import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [
    './products-list.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];

  paginationLinksSubject: BehaviorSubject<{ [s: string]: string }>;
  paginationLinksSubscription;
  paginationLinks: { [s: string]: string };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
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
  }

  ngOnDestroy() {
    this.paginationLinksSubscription.unsubscribe();
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
}
