import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesRef } from 'src/app/models/routes-ref.model';

@Component({
  selector: 'app-product-detail-header',
  templateUrl: './product-detail-header.component.html',
  styleUrls: ['./product-detail-header.component.scss']
})
export class ProductDetailHeaderComponent {
  @Input() public category: string;

  public constructor(private router: Router) {}

  public onGoBack(): void {
    this.router.navigate([RoutesRef.products]);
  }
}
