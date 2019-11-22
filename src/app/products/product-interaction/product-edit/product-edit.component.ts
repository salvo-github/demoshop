import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../../shared/models/category.model';
import { EditFormFields } from '../../../shared/models/edit-form-fields.model';
import { Product } from '../../../shared/models/product.model';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';
import { REG_EXP_URL } from 'src/app/services/form-errors.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends ProductInteractionComponent
  implements OnInit {
  public editForm: FormGroup;
  public editFormFields = EditFormFields;

  public genders = Product.getGendersList();
  public ratingItems = Product.getRatingItemsForSelect();
  public categories$: Observable<Category[]>;

  public urlPattern = REG_EXP_URL;

  public ngOnInit() {
    this.editForm = new FormGroup({});

    this.categories$ = this.productsService.fetchCategories();
  }

  addFormControl(controlName: string, formControl: FormControl): void {
    this.editForm.addControl(controlName, formControl);
  }

  public onSubmit() {
    const editedProduct: Product = Object.assign(
      this.product,
      this.editForm.value
    );

    this.store.dispatch(
      ProductsActions.saveCurrentProduct({ product: editedProduct })
    );

    this.closeModalHandler();
  }
}
