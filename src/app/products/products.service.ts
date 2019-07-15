import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import { Category } from './category.model';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  currentProduct: Product;
  private paginationLink: { [s: string]: string } = {};
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  fetchProduct(id: number) {
    return this.http
      .get<Product>(`http://localhost:3000/api/products/${id}`)
      .pipe(
        tap((value) => {
          this.currentProduct = value;
        })
      );
  }

  getCurrentProduct() {
    return this.currentProduct;
  }

  fetchProducts(values: { [s: string]: any } = {}) {
    let params = new HttpParams();

    params = params.append('_page', '1');
    params = params.append('_limit', '5');

    let onlyAvailable = false;
    for (const key in values) {
      if (values.hasOwnProperty(key) && !!values[key]) {
        if (key === 'availability') {
          onlyAvailable = true;
        } else {
          params = params.append(key, values[key]);
        }
      }
    }

    return this.http
      .get<Product[]>('http://localhost:3000/api/products', {
        observe: 'response',
        params
      })
      .pipe(
        tap(
          (responseData: HttpResponse<Product[]>): void => {
            this.paginationLink['X-Total-Count'] = responseData.headers.get(
              'X-Total-Count'
            );
            this.paginationLink['Link'] = responseData.headers.get('Link');
            console.log(this.paginationLink);
          }
        ),
        map(
          (responseData: HttpResponse<Product[]>): Product[] => {
            console.log(responseData);
            const productsFiltered = responseData.body.filter(
              (product: Product) => {
                if (onlyAvailable === true) {
                  return product.count - product.soldCount > 0;
                } else {
                  return true;
                }
              }
            );
            return productsFiltered;
          }
        )
      );
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
