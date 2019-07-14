import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from './category.model';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  currentProduct: Product;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

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

  fetchProducts(values: { [s: string]: any } = {}) {
    let params = new HttpParams();
    for (const key in values) {
      if (values.hasOwnProperty(key) && !!values[key]) {
        params = params.append(key, values[key]);
      }
    }

    return this.http.get<Product[]>('http://localhost:3000/api/products', {
      params
    });
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
