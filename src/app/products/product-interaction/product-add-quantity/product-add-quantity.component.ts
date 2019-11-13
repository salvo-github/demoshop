import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';

@Component({
  selector: 'app-product-add-quantity',
  templateUrl: './product-add-quantity.component.html',
  styleUrls: ['./product-add-quantity.component.scss']
})
export class ProductAddQuantityComponent extends ProductInteractionComponent {
  private quantityToAdd = Product.getDefaultQuantityToAdd();

  public onUpdate(): void {
    this.product.count += this.quantityToAdd;
    this.store.dispatch(
      ProductsActions.saveCurrentProduct({ product: this.product })
    );
    this.closeModalHandler();
  }
}
