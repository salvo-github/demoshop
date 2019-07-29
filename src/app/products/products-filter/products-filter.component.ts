import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { ProductsService } from '../products.service';
import { Subscription } from 'rxjs';
import { FilterFormFields } from './filter-form-fields.model';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit, OnDestroy {
  public showFilters = false;

  public categories: Category[];

  public filtersForm: FormGroup;
  public genders = ['None', 'Man', 'Woman', 'Unisex'];

  // all the params map the query string for the api
  private initialFiltersFormValue = {
    availability: false,
    gender: '',
    categoryId: '',
    cost_gte: null,
    cost_lte: null,
    rating: '',
    // q: api param for full text search
    q: null
  };
  public filterFormFields = FilterFormFields;

  private fetchCategoriesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchCategoriesSubscription = this.productsService
      .fetchCategories()
      .subscribe((categoriesData) => {
        this.categories = categoriesData;
      });

    this.initForm();
  }

  ngOnDestroy() {
    if (this.fetchCategoriesSubscription) {
      this.fetchCategoriesSubscription.unsubscribe();
    }
  }

  initForm() {
    this.filtersForm = new FormGroup(
      {
        [this.filterFormFields.availability]: new FormControl(
          this.route.snapshot.queryParamMap.get(
            this.filterFormFields.availability
          ) || this.initialFiltersFormValue[this.filterFormFields.availability]
        ),
        [this.filterFormFields.gender]: new FormControl(
          this.route.snapshot.queryParamMap.get(this.filterFormFields.gender) ||
            this.initialFiltersFormValue[this.filterFormFields.gender]
        ),
        [this.filterFormFields.categoryId]: new FormControl(
          this.route.snapshot.queryParamMap.get(
            this.filterFormFields.categoryId
          ) || this.initialFiltersFormValue[this.filterFormFields.categoryId]
        ),
        [this.filterFormFields.q]: new FormControl(
          this.route.snapshot.queryParamMap.get(this.filterFormFields.q) ||
            this.initialFiltersFormValue[this.filterFormFields.q]
        ),
        [this.filterFormFields.rating]: new FormControl(
          this.route.snapshot.queryParamMap.get(this.filterFormFields.rating) ||
            this.initialFiltersFormValue[this.filterFormFields.rating]
        ),
        [this.filterFormFields.cost_gte]: new FormControl(
          this.route.snapshot.queryParamMap.get(
            this.filterFormFields.cost_gte
          ) || this.initialFiltersFormValue[this.filterFormFields.cost_gte]
        ),
        [this.filterFormFields.cost_lte]: new FormControl(
          this.route.snapshot.queryParamMap.get(
            this.filterFormFields.cost_lte
          ) || this.initialFiltersFormValue[this.filterFormFields.cost_lte]
        )
      },
      {
        validators: [this.costValidator]
      }
    );
  }

  onApplyFilters() {
    if (this.filtersForm.invalid) {
      return false;
    }

    this.cleanEmptyValues(this.filtersForm.value);

    this.router.navigate(this.route.snapshot.url, {
      queryParams: this.filtersForm.value
    });

    this.showFilters = false;
  }

  onResetFilters() {
    this.filtersForm.reset(this.initialFiltersFormValue);

    this.onApplyFilters();
  }

  cleanEmptyValues(filtersFormValues) {
    for (const key in filtersFormValues) {
      if (filtersFormValues.hasOwnProperty(key) && !filtersFormValues[key]) {
        delete filtersFormValues[key];
      }
    }
  }

  costValidator(group: FormGroup): { [s: string]: boolean } | null {
    if (
      group.value.cost_lte !== null &&
      group.value.cost_gte !== null &&
      +group.value.cost_gte > +group.value.cost_lte
    ) {
      group.controls.cost_gte.setErrors({
        greater: '"Price from" cannot be greater then "Price to"'
      });
      group.controls.cost_lte.setErrors({
        lesser: '"Price to" cannot be lesser then "Price from"'
      });
      return { notvalid: true };
    }
    group.controls.cost_lte.setErrors(null);
    group.controls.cost_gte.setErrors(null);
    return null;
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
