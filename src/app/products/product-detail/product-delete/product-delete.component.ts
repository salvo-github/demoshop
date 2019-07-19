import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesRef } from 'src/app/routes-ref.model';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  RoutesRef = RoutesRef;

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
      this.router.navigate([RoutesRef.products]);
    });
  }
}
