import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Category } from './category.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  currentProduct: Product;
  constructor(private http: HttpClient) {}

  fetchProduct(id: number) {
    return this.http
      .get<Product>(`http://localhost:3000/api/products/${id}`)
      .pipe(
        tap((productData) => {
          this.currentProduct = productData;
        })
      );
  }

  getCurrentProduct() {
    return this.currentProduct;
  }

  fetchProducts() {
    return this.http.get<Product[]>('http://localhost:3000/api/products');
  }

  fetchCategoryById(id: number) {
    return this.http.get<Category>(
      `http://localhost:3000/api/categories/${id}`
    );
  }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }

  saveProduct(product: Product) {
    return this.http.patch(
      `http://localhost:3000/api/products/${product.id}`,
      product
    );
  }
}
