import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProduct(id: number) {
    return this.http.get<Product>(`http://localhost:3000/api/products/${id}`);
  }

  fetchProducts() {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }

  fetchCategoryById(id: number) {
    return this.http.get<Category>(
      `http://localhost:3000/api/categories/${id}`
    );
  }
}
