import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { EditFormFields } from '../../../shared/models/edit-form-fields.model';
import { Product } from '../../../shared/models/product.model';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends ProductInteractionComponent
  implements OnInit {
  public editForm: FormGroup;
  public editFormFields = EditFormFields;
  public genders = ['Man', 'Woman', 'Unisex'];
  public categories$: Observable<Category[]>;

  public ngOnInit() {
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

    this.categories$ = this.productsService.fetchCategories();
  }

  private toNumber(control: FormControl): { [s: string]: boolean } {
    if (typeof control.value !== 'number') {
      const value = parseFloat(control.value);
      control.setValue(value);
    }
    return null;
  }

  public onSubmit() {
    const editedProduct: Product = Object.assign(
      this.product,
      this.editForm.value
    );

    this.store.dispatch(
      ProductsActions.saveCurrentProduct({ product: editedProduct })
    );

    super.closeModalHandler();
  }

  public onCancel(): void {
    super.closeModalHandler();
  }

  public getUrlPattern(): RegExp {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return new RegExp(expression);
  }

  public controlHasError(control: string, error: string): boolean {
    return (
      this.editForm.get(control).touched &&
      this.editForm.get(control).hasError(error)
    );
  }
}
