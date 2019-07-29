import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutesRef } from 'src/app/routes-ref.model';
import { Category } from '../../category.model';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
import { EditFormFields } from './edit-form-fields.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  private fetchCategoriesSubscription: Subscription;
  private saveProductSubscription: Subscription;

  public editForm: FormGroup;
  public editFormFields = EditFormFields;
  public genders = ['Man', 'Woman', 'Unisex'];
  public categories: Category[];
  public product: Product;

  public constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit() {
    this.product = this.route.snapshot.data.product || new Product();

    this.editForm = new FormGroup({
      [this.editFormFields.name]: new FormControl(this.product.name, [
        Validators.required
      ]),
      [this.editFormFields.categoryId]: new FormControl(
        this.product.categoryId,
        this.toNumber
      ),
      [this.editFormFields.gender]: new FormControl(this.product.gender, [
        Validators.required
      ]),
      [this.editFormFields.description]: new FormControl(
        this.product.description,
        [Validators.required]
      ),
      [this.editFormFields.image]: new FormControl(this.product.image, [
        Validators.required,
        Validators.pattern(this.getUrlPattern())
      ]),
      [this.editFormFields.cost]: new FormControl(this.product.cost, [
        Validators.required,
        this.toNumber
      ]),
      [this.editFormFields.rating]: new FormControl(this.product.rating, [
        Validators.required,
        this.toNumber
      ])
    });

    this.fetchCategoriesSubscription = this.productsService
      .fetchCategories()
      .subscribe((categoriesData) => {
        this.categories = categoriesData;
      });
  }

  public ngOnDestroy() {
    if (this.saveProductSubscription) {
      this.saveProductSubscription.unsubscribe();
    }
    if (this.fetchCategoriesSubscription) {
      this.fetchCategoriesSubscription.unsubscribe();
    }
  }

  private toNumber(control: FormControl): { [s: string]: boolean } {
    if (typeof control.value !== 'number') {
      const value = parseFloat(control.value);
      control.setValue(value);
    }
    return null;
  }

  protected onSubmit() {
    const editedProduct: Product = Object.assign(
      this.product,
      this.editForm.value
    );
    this.saveProductSubscription = this.productsService
      .saveProduct(editedProduct)
      .subscribe((productResponse: Product) => {
        this.router.navigate([RoutesRef.product, productResponse.id]);
      });
  }

  protected onCancel(): void {
    if (this.product.id) {
      this.router.navigate(['../'], { relativeTo: this.route });
    } else {
      this.router.navigate([RoutesRef.products]);
    }
  }

  protected getUrlPattern() {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return new RegExp(expression);
  }

  protected controlHasError(control: string, error: string): boolean {
    return (
      this.editForm.get(control).touched &&
      this.editForm.get(control).hasError(error)
    );
  }
}
