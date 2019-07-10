import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe((productsResolved: Data) => {
      if (!productsResolved.productsList.length) {
        this.router.navigate(['/page-not-found'], {
          skipLocationChange: true
        });
      }
      this.products = productsResolved.productsList;
    });
  }
}
