import { Component, OnInit, Input } from '@angular/core';
import { ProductCardComponent } from '../product-card.component';
import { Product } from '../../product.model';
import { UserService } from 'src/app/user/user.service';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-card-pdp',
  templateUrl: './card-pdp.component.html',
  styleUrls: ['./card-pdp.component.scss']
})
export class CardPdpComponent extends ProductCardComponent implements OnInit {
  @Input() product: Product;

  constructor(
    protected userService: UserService,
    protected productService: ProductsService
  ) {
    super(userService, productService);
  }

  ngOnInit() {}
}
