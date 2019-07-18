import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';
import { RouteRef } from 'src/app/route.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  RouteRef = RouteRef;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
  }

  onDelete() {
    this.productService.deleteProduct(this.product).subscribe((resp) => {
      this.router.navigate([RouteRef.products]);
    });
  }
}
