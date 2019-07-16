import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../category.model';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: [
    '../../../assets/scss/form/form.scss',
    './products-list.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[];

  showFilters = false;
  filtersForm: FormGroup;
  initialFiltersFormValue = {
    availability: false,
    gender: null,
    categoryId: '',
    // q: api param for full text search
    q: null
  };
  genders = ['Man', 'Woman', 'Unisex'];

  paginationLinksSubject: BehaviorSubject<{ [s: string]: string }>;
  paginationLinksSubscription;
  paginationLinks: { [s: string]: string };

  fetchProductsTimeout: ReturnType<typeof setTimeout>;

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

    this.getPaginationLinks();

    this.initForm();
  }

  ngOnDestroy() {
    this.paginationLinksSubscription.unsubscribe();
  }

  initForm() {
    this.filtersForm = new FormGroup({
      availability: new FormControl(this.initialFiltersFormValue.availability),
      gender: new FormControl(this.initialFiltersFormValue.gender),
      categoryId: new FormControl(this.initialFiltersFormValue.categoryId),
      q: new FormControl(this.initialFiltersFormValue.q)
    });

    for (const param of this.route.snapshot.queryParamMap.keys) {
      this.filtersForm.patchValue({
        [param]: this.route.snapshot.queryParamMap.get(param)
      });
    }
  }

  onApplyFilters() {
    console.log(this.filtersForm.value);

    this.fetchFilteredProducts(this.filtersForm.value);
  }

  onResetFilters() {
    this.filtersForm.reset(this.initialFiltersFormValue);

    this.fetchFilteredProducts({});
  }

  fetchFilteredProducts(
    valuesForFiltering: { [s: string]: any },
    url?: string
  ) {
    for (const key in valuesForFiltering) {
      if (
        valuesForFiltering.hasOwnProperty(key) &&
        !!valuesForFiltering[key] === false
      ) {
        delete valuesForFiltering[key];
      }
    }

    this.router.navigate(this.route.snapshot.url, {
      queryParams: valuesForFiltering
    });

    this.productsService
      .fetchProducts(valuesForFiltering, url)
      .subscribe((productsData: Product[]) => {
        this.products = productsData;
      });

    this.showFilters = false;
  }

  getPaginationLinks() {
    this.paginationLinksSubject = this.productsService.getPaginationLinksSubject();

    this.paginationLinksSubscription = this.paginationLinksSubject.subscribe(
      (paginationLinks) => {
        this.paginationLinks = paginationLinks;
      }
    );
  }

  fetchProductOnTimeout(filtersFormValues) {
    clearTimeout(this.fetchProductsTimeout);
    // check if it can be replaced with an observable
    this.fetchProductsTimeout = setTimeout(() => {
      this.fetchFilteredProducts(filtersFormValues);
    }, 1000);
  }
}
