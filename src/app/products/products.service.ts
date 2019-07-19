import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  private onDeleteSubject: Subject<Product> = new Subject<Product>();

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  fetchProduct(id: number) {
    return this.http
      .get<Product>(`http://localhost:3000/api/products/${id}`)
      .pipe(
        tap((value) => {
          // when the user is in edit page che current product will be referenced
          this.currentProduct = value;
        })
      );
  }

  setCurrentProduct(product: Product) {
    this.currentProduct = product;
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
      if (valuesForFiltering.hasOwnProperty(key)) {
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
    if (product.id === undefined) {
      return this.http.post(`http://localhost:3000/api/products`, product);
    }
    return this.http.patch(
      `http://localhost:3000/api/products/${product.id}`,
      product
    );
  }

  deleteProduct(product: Product) {
    return this.http.delete(`http://localhost:3000/api/products/${product.id}`);
  }

  // This function recover the pagination link set by the server in the 'Link' property
  // and add every link in the property object 'paginationLinks'
  //
  // The server return a single string with for links for pagination: prev, next, first, last
  // eg:
  // <http://localhost:3000/api/products?_page=1&_limit=5&_page=1&_limit=5&_page=1&_limit=5&_page=1&_limit=5>; rel="first", <http://loc...
  //
  // the method use a reg exp to take the link inside '<' '>'
  //
  // the link mapping (prev, next, ecc) are inside the paginationLinks object
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

  getOnDeleteSubject() {
    return this.onDeleteSubject;
  }
}
