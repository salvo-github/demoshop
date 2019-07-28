import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {
  showFilters = false;

  categories: Category[];

  filtersForm: FormGroup;
  genders = ['None', 'Man', 'Woman', 'Unisex'];
  // all the params map the query string for the api
  initialFiltersFormValue = {
    availability: false,
    gender: '',
    categoryId: '',
    cost_gte: null,
    cost_lte: null,
    rating: '',
    // q: api param for full text search
    q: null
  };

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService.fetchCategories().subscribe((categoriesData) => {
      this.categories = categoriesData;
    });

    this.initForm();
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
  }

  onApplyFilters() {
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
      if (
        filtersFormValues.hasOwnProperty(key) &&
        (filtersFormValues[key] === false ||
          filtersFormValues[key] === '' ||
          filtersFormValues[key] === null)
      ) {
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

  toggleFilters() {
    this.showFilters = !this.showFilters;
    return this.showFilters;
  }
}
