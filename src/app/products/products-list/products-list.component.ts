import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category.model';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Subject, BehaviorSubject } from 'rxjs';

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
  showFilters = false;
  products: Product[];
  filtersForm: FormGroup;
  categories: Category[];
  genders = ['Man', 'Woman', 'Unisex'];
  paginationLinksSubject: BehaviorSubject<{ [s: string]: string }>;
  paginationLinks: { [s: string]: string };

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

    this.paginationLinksSubject = this.productsService.getPaginationLinksSubject();

    this.paginationLinksSubject.subscribe((paginationLinks) => {
      this.paginationLinks = paginationLinks;
      console.log(paginationLinks);
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

  ngOnDestroy() {
    this.paginationLinksSubject.unsubscribe();
  }
}
