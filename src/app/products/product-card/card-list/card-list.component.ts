import { Component, EventEmitter, Output } from '@angular/core';
import { ProductInteractionType } from 'src/app/shared/models/product-interaction-type.model';
import { Product } from 'src/app/shared/models/product.model';
import { RoutesRef } from 'src/app/shared/models/routes-ref.model';
import { AdminActions } from '../../../shared/models/admin-actions.model';
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends ProductCardComponent {
  @Output() private productToDelete = new EventEmitter<Product>();
  @Output() private setProductInteractionType = new EventEmitter<{}>();

  protected navigateToDetailPage($event: MouseEvent): void {
    if (!$event.defaultPrevented) {
      this.router.navigate([RoutesRef.product, this.product.id]);
    }
  }

  protected getAdminActions() {
    return {
      [AdminActions.delete]: () => this.onDeleteHandler()
    };
  }

  // used to delete a product from product list page
  public onDeleteHandler(): void {
    this.productToDelete.emit(this.product);
    this.setProductInteractionType.emit(ProductInteractionType.delete);
  }
}
