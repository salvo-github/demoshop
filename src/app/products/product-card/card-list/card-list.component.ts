import { Component } from '@angular/core';
import { RoutesRef } from 'src/app/routes-ref.model';
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends ProductCardComponent {
  protected getLinkToDetailPage($event: MouseEvent): void {
    if (!$event.defaultPrevented) {
      this.router.navigate([RoutesRef.product, this.product.id]);
    }
  }

  protected getActions() {
    return {
      delete: this.onDeleteHandler.bind(this)
    };
  }

  // used to delete a product from product list page
  public onDeleteHandler(): void {
    this.productService.setCurrentProduct(this.product);
    this.getLink('delete', this.product.id);
  }
}
