import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: [
    './product-card.component.scss',
    '../../../assets/scss/mediaquery.scss'
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() parentComponent: string;

  constructor(private router: Router) {}

  ngOnInit() {}
}
