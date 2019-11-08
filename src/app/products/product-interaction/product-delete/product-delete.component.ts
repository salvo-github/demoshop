import { Component } from '@angular/core';
import * as ProductsActions from '../../store/products.actions';
import { ProductInteractionComponent } from '../product-interaction.component';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent extends ProductInteractionComponent {
  public onDelete(): void {
    this.store.dispatch(
      ProductsActions.deleteCurrentProduct({ product: this.product })
    );
    this.closeModalHandler();
  }

  public onCancel(): void {
    this.closeModalHandler();
  }
}
