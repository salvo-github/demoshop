import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducer';
import { Product } from '../../models/product.model';
import {
  getCurrentProduct,
  getCurrentProductCategory
} from '../store/products.reducer';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product$: Observable<Product>;
  public category$: Observable<string>;

  public constructor(private store: Store<AppState>) {}

  public ngOnInit() {
    this.product$ = this.store.pipe(select(getCurrentProduct));
    this.category$ = this.store.pipe(select(getCurrentProductCategory));
  }
}
