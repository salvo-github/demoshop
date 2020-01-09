import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Product } from 'src/app/models/product.model';
import { Category } from '../../models/category.model';
import { FilterFormFields } from '../../models/filter-form-fields.model';
import { ProductsService } from '../../services/products.service';
import * as ProductsActions from '../store/products.actions';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  public showFilters = false;

  public filtersForm: FormGroup;
  public filterFormFields = FilterFormFields;

  public ratingItems: {
    id: number | string;
    name: number | string;
  }[];
  public categories$: Observable<(Category | { id: string; name: string })[]>;
  public genderItems: {
    id: string;
    name: string;
  }[];

  // all the params map the query string for the api
  public initialFiltersFormValue = {
    [FilterFormFields.availability]: false,
    [FilterFormFields.gender]: '',
    [FilterFormFields.categoryId]: '',
    [FilterFormFields.cost_gte]: null,
    [FilterFormFields.cost_lte]: null,
    [FilterFormFields.rating]: '',
    // q: api param for full text search
    [FilterFormFields.q]: null
  };

  public constructor(
    private productsService: ProductsService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  public ngOnInit() {
    this.ratingItems = [
      { id: '', name: 'None' },
      ...Product.getRatingItemsForSelect()
    ];

    this.categories$ = this.productsService.fetchCategories().pipe(
      map(values => {
        return [{ id: '', name: 'None' }, ...values];
      })
    );

    this.genderItems = [{ id: '', name: 'None' }, ...Product.getGendersList()];

    this.filtersForm = new FormGroup({});
    this.filtersForm.setValidators(this.costValidator);
  }

  public addFormControl(controlName: string, formControl: FormControl): void {
    this.filtersForm.setControl(controlName, formControl);
  }

  public onApplyFilters(): boolean | void {
    if (this.filtersForm.invalid) {
      return false;
    }

    this.cleanEmptyValues(this.filtersForm.value);

    const valuesForFiltering = this.filtersForm.value;

    // adding to the url the params for filtering product (ex. copy link)
    this.router.navigate([], {
      queryParams: valuesForFiltering
    });

    this.store.dispatch(
      ProductsActions.fetchProducts({
        params: { valuesForFiltering }
      })
    );

    this.showFilters = false;
  }

  onResetFilters(): void {
    this.filtersForm.reset(this.initialFiltersFormValue);

    this.onApplyFilters();
  }

  private cleanEmptyValues(filtersFormValues): void {
    for (const key in filtersFormValues) {
      if (filtersFormValues.hasOwnProperty(key) && !filtersFormValues[key]) {
        delete filtersFormValues[key];
      }
    }
  }

  private costValidator(group: FormGroup): { [s: string]: boolean } | null {
    if (
      group.value.cost_lte === undefined ||
      group.value.cost_gte === undefined
    ) {
      return null;
    }
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
      return { notValidPriceRange: true };
    }
    group.controls.cost_lte.setErrors(null);
    group.controls.cost_gte.setErrors(null);
    return null;
  }

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
