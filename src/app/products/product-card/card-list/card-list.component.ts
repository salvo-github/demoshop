import { Component } from '@angular/core';
import { RoutesRef } from 'src/app/routes-ref.model';
import { ProductCardComponent } from '../product-card.component';
import { AdminActions } from '../admin-actions.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends ProductCardComponent {
  protected navigateToDetailPage($event: MouseEvent): void {
    if (!$event.defaultPrevented) {
      this.router.navigate([RoutesRef.product, this.product.id]);
    }
  }

  protected getActions() {
    return {
      [AdminActions.delete]: () => this.onDeleteHandler()
    };
  }

  // used to delete a product from product list page
  public onDeleteHandler(): void {
    this.productService.setCurrentProduct(this.product);
    this.navigateTo('delete', this.product.id);
  }
}
