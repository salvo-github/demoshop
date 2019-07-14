import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  ParamMap,
  NavigationEnd
} from '@angular/router';

import { Product } from '../product.model';
import { Category } from '../category.model';

import { ProductsService } from '../products.service';
import { HttpParams } from '@angular/common/http';
import {
  take,
  takeLast,
  last,
  publishLast,
  tap,
  distinctUntilChanged,
  skip
} from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [
    '../../../assets/scss/form/form.scss',
    './products-list.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductsListComponent implements OnInit {
  showFilters = false;
  products: Product[];
  filtersForm: FormGroup;
  categories: Category[];
  genders = ['Man', 'Woman', 'Unisex'];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.route.snapshot.data.products.length) {
      this.products = this.route.snapshot.data.products;
    }

    this.productsService.fetchCategories().subscribe((categoriesData) => {
      this.categories = categoriesData;
    });

    this.filtersForm = new FormGroup({
      availability: new FormControl(
        this.route.snapshot.queryParamMap.get('availability')
      ),
      gender: new FormControl(this.route.snapshot.queryParamMap.get('gender')),
      categoryId: new FormControl(
        this.route.snapshot.queryParamMap.get('categoryId')
      )
    });

    this.filtersForm.valueChanges.subscribe((values) => {
      this.router.navigate(this.route.snapshot.url, { queryParams: values });

      this.productsService
        .fetchProducts(values)
        .subscribe((productsData: Product[]) => {
          this.products = productsData;
        });
    });
  }
}
