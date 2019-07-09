import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  fetchProduct(id: number) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`);
  }

  fetchProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }
}
