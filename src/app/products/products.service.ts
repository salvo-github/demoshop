import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from './category.model';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private currentProduct: Product;
  private paginationLinks = {
    next: null,
    prev: null,
    first: null,
    last: null
  };
  private paginationLinksSubject = new BehaviorSubject<{ [s: string]: string }>(
    this.paginationLinks
  );

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

  fetchProducts(
    valuesForFiltering: { [s: string]: any } = {},
    url: string = 'http://localhost:3000/api/products',
    page: string = '1',
    limit: string = '5'
  ) {
    let params = new HttpParams();

    params = params.append('_page', page);
    params = params.append('_limit', limit);

    let onlyAvailable = false;
    for (const key in valuesForFiltering) {
      if (valuesForFiltering.hasOwnProperty(key) && !!valuesForFiltering[key]) {
        if (key === 'availability') {
          onlyAvailable = true;
        } else {
          params = params.append(key, valuesForFiltering[key]);
        }
      }
    }

    return this.http
      .get<Product[]>(url, {
        observe: 'response',
        params
      })
      .pipe(
        tap(
          (responseData: HttpResponse<Product[]>): void => {
            this.setPaginationLinks(responseData.headers.get('Link'));
          }
        ),
        map(
          (responseData: HttpResponse<Product[]>): Product[] => {
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

  setPaginationLinks(headerLink: string) {
    const links = headerLink.split(', ');

    for (const key in this.paginationLinks) {
      if (this.paginationLinks.hasOwnProperty(key)) {
        this.paginationLinks[key] = null;
        for (const link of links) {
          const regExp = new RegExp(`<(.*)>; rel="${key}"`);
          const $match = link.match(regExp);
          if ($match !== null) {
            this.paginationLinks[key] = $match[1];
          }
        }
      }
    }

    this.paginationLinksSubject.next(this.paginationLinks);
  }

  getPaginationLinksSubject() {
    return this.paginationLinksSubject;
  }
}
