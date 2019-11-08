import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducer';
import { PaginationLinks } from 'src/app/shared/models/pagination-links.model';
import * as ProductsActions from '../../store/products.actions';
import { getPaginationLinks } from '../../store/products.reducer';

@Component({
  selector: 'app-products-list-navigation',
  templateUrl: './products-list-navigation.component.html',
  styleUrls: ['./products-list-navigation.component.scss']
})
export class ProductsListNavigationComponent implements OnInit {
  public paginationLinks$: Observable<PaginationLinks>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.paginationLinks$ = this.store.pipe(select(getPaginationLinks));
  }

  public fetchFilteredProducts(url: string): void {
    this.store.dispatch(ProductsActions.fetchProducts({ params: { url } }));
  }
}
