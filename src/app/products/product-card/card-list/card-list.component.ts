import { Component, OnInit, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card.component';
import { UserService } from 'src/app/user/user.service';
import { ProductsService } from '../../products.service';
import { Product } from '../../product.model';
import { RoutesRef } from 'src/app/routes-ref.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent extends ProductCardComponent implements OnInit {
  @Input() product: Product;
  private RoutesRef = RoutesRef;

  constructor(
    protected userService: UserService,
    protected productService: ProductsService
  ) {
    super(userService, productService);
  }

  ngOnInit() {}

  getLinkToDetailPage() {
    return [this.RoutesRef.product, this.product.id];
  }
}
