import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { ProductsService } from '../../services/products.service';
import { FilterFormFields } from './filter-form-fields.model';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  public showFilters = false;

  public categories$: Observable<(Category | { id: string; name: string })[]>;

  public filtersForm: FormGroup;
  public genders = ['None', 'Man', 'Woman', 'Unisex'];
  public filterFormFields = FilterFormFields;

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
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.categories$ = this.productsService.fetchCategories().pipe(
      map(values => {
        return [{ id: '', name: 'None' }, ...values];
      })
    );

    this.filtersForm = new FormGroup({});
  }

  private initForm(): void {
    this.filtersForm = new FormGroup(
      {
        [FilterFormFields.availability]: new FormControl(
          this.route.snapshot.queryParamMap.get(
            FilterFormFields.availability
          ) || this.initialFiltersFormValue[FilterFormFields.availability]
        ),
        [FilterFormFields.gender]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.gender) ||
            this.initialFiltersFormValue[FilterFormFields.gender]
        ),
        [FilterFormFields.categoryId]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.categoryId) ||
            this.initialFiltersFormValue[FilterFormFields.categoryId]
        ),
        [FilterFormFields.q]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.q) ||
            this.initialFiltersFormValue[FilterFormFields.q]
        ),
        [FilterFormFields.rating]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.rating) ||
            this.initialFiltersFormValue[FilterFormFields.rating]
        ),
        [FilterFormFields.cost_gte]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.cost_gte) ||
            this.initialFiltersFormValue[FilterFormFields.cost_gte]
        ),
        [FilterFormFields.cost_lte]: new FormControl(
          this.route.snapshot.queryParamMap.get(FilterFormFields.cost_lte) ||
            this.initialFiltersFormValue[FilterFormFields.cost_lte]
        )
      },
      {
        validators: [this.costValidator]
      }
    );
  }

  public addFormControl(controlName: string, formControl: FormControl): void {
    this.filtersForm.addControl(controlName, formControl);
  }

  public onApplyFilters(): boolean | void {
    console.log(this.filtersForm);

    // if (this.filtersForm.invalid) {
    //   return false;
    // }

    // this.cleanEmptyValues(this.filtersForm.value);

    // this.router.navigate(this.route.snapshot.url, {
    //   queryParams: this.filtersForm.value
    // });

    // this.showFilters = false;
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

  public toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
}
