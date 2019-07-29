import { Component } from '@angular/core';
import { RoutesRef } from 'src/app/routes-ref.model';
import { ProductCardComponent } from '../product-card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends ProductCardComponent {
  private RoutesRef = RoutesRef;

  protected getLinkToDetailPage(): any[] {
    return [this.RoutesRef.product, this.product.id];
  }
}
