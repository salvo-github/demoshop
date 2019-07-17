import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  // all the params map the query string for the api
  initialFiltersFormValue = {
    availability: false,
    gender: 'None',
    categoryId: '',
    cost_gte: '',
    cost_lte: '',
    rating: '',
    // q: api param for full text search
    q: null
  };
  genders = ['None', 'Man', 'Woman', 'Unisex'];

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
    this.filtersForm = new FormGroup(
      {
        availability: new FormControl(
          this.route.snapshot.queryParamMap.get('availability') ||
            this.initialFiltersFormValue.availability
        ),
        gender: new FormControl(
          this.route.snapshot.queryParamMap.get('gender') ||
            this.initialFiltersFormValue.gender
        ),
        categoryId: new FormControl(
          this.route.snapshot.queryParamMap.get('categoryId') ||
            this.initialFiltersFormValue.categoryId
        ),
        q: new FormControl(
          this.route.snapshot.queryParamMap.get('q') ||
            this.initialFiltersFormValue.q
        ),
        rating: new FormControl(
          this.route.snapshot.queryParamMap.get('rating') ||
            this.initialFiltersFormValue.rating
        ),
        cost_gte: new FormControl(
          this.route.snapshot.queryParamMap.get('cost_gte') ||
            this.initialFiltersFormValue.cost_gte
        ),
        cost_lte: new FormControl(
          this.route.snapshot.queryParamMap.get('cost_lte') ||
            this.initialFiltersFormValue.cost_lte
        )
      },
      {
        validators: [this.costValidator]
      }
    );

    // for (const param of this.route.snapshot.queryParamMap.keys) {
    //   this.filtersForm.patchValue({
    //     [param]: this.route.snapshot.queryParamMap.get(param)
    //   });
    // }
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
    this.cleanValues(valuesForFiltering);

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

  cleanValues(valuesForFiltering) {
    for (const key in valuesForFiltering) {
      if (
        valuesForFiltering.hasOwnProperty(key) &&
        (valuesForFiltering[key] === false ||
          valuesForFiltering[key] === '' ||
          valuesForFiltering[key] === null)
      ) {
        delete valuesForFiltering[key];
      }
    }
  }

  getPaginationLinks() {
    this.paginationLinksSubject = this.productsService.getPaginationLinksSubject();

    this.paginationLinksSubscription = this.paginationLinksSubject.subscribe(
      (paginationLinks) => {
        this.paginationLinks = paginationLinks;
      }
    );
  }

  costValidator(group: FormGroup): { [s: string]: boolean } | null {
    if (+group.value.cost_gte > +group.value.cost_lte) {
      group.controls.cost_lte.setErrors({ lesser: "lesser then 'Price from'" });
      group.controls.cost_gte.setErrors({ greater: "greater then 'Price to'" });
      return { notvalid: true };
    }
    group.controls.cost_lte.setErrors(null);
    group.controls.cost_gte.setErrors(null);
    return null;
  }
}
