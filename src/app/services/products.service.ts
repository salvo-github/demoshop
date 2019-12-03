import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { PaginationLinks } from '../models/pagination-links.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public constructor(private http: HttpClient, private route: ActivatedRoute) {}

  /**
   * @description
   * Retrieve the product from the server and store it in [currentProduct]
   * @param productId the product id to fetch
   */
  public fetchProduct(productId: number): Observable<Product> {
    return this.http.get<Product>(
      `http://localhost:3000/api/products/${productId}`
    );
  }

  /**
   * @description
   * This method will retrieve the products from the server
   *
   * @param valuesForFiltering this object it's used to pass the params to the server and retrieve the filtered products
   * @param url this param it's used for the pagination because the server in the response add the links
   * for next, prev, first and last pages.
   * @param page the page to retrieve from the server
   * @param limit the max amount of products to retrieve
   *
   * @
   */
  public fetchProducts({
    valuesForFiltering = {} as { [s: string]: any },
    url = 'http://localhost:3000/api/products',
    page = '1',
    limit = '5'
  } = {}): Observable<HttpResponse<Product[]>> {
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
        map(
          (responseData: HttpResponse<Product[]>): HttpResponse<Product[]> => {
            const productsFiltered = responseData.body.filter(
              (product: Product) => {
                if (onlyAvailable === true) {
                  return product.count - product.soldCount > 0;
                }
                return true;
              }
            );
            const responseDataFiltered = responseData.clone({
              body: productsFiltered
            });
            return responseDataFiltered;
          }
        )
      );
  }

  public fetchCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(
      `http://localhost:3000/api/categories/${categoryId}`
    );
  }

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/categories');
  }

  /**
   * @description
   * This function will create a new product if the product parameter does not have an id,
   * otherwise the existing product will be updated.
   *
   * @param product the product to update or add
   */
  public saveProduct(product: Product): Observable<Product> {
    if (product.id === undefined) {
      return this.http.post<Product>(
        `http://localhost:3000/api/products`,
        product
      );
    }
    return this.http.patch<Product>(
      `http://localhost:3000/api/products/${product.id}`,
      product
    );
  }

  public deleteProduct(product: Product): Observable<{}> {
    return this.http.delete<{}>(
      `http://localhost:3000/api/products/${product.id}`
    );
  }
  /**
   * @description
   * This function recover the pagination link set by the server in the 'Link' property
   * and add every link in the property object ```paginationLinks```
   * The server return a single string with for links for pagination: ```prev```, ```next```, ```first```, ```last```
   * the method use a reg exp to take the link inside ```< >```
   * the link mapping (prev, next, ecc) are inside the ```paginationLinks``` object
   *
   * @param headerLink \<http://localhost:3000/api/products?
   * _page=1&_limit=5&_page=1&_limit=5&_page=1&_limit=5&_page=1&_limit=5>; rel="first",
   * <http://loc...
   */
  public setPaginationLinks(headerLink: string): PaginationLinks {
    const paginationLinks = new PaginationLinks();

    const links = headerLink.split(', ');

    for (const key in paginationLinks) {
      if (paginationLinks.hasOwnProperty(key)) {
        for (const link of links) {
          const regExp = new RegExp(`<(.*)>; rel="${key}"`);
          const $match = link.match(regExp);
          if ($match !== null) {
            paginationLinks[key] = $match[1];
          }
        }
      }
    }

    return paginationLinks;
  }

  public getProductMaxRating(): number {
    return Product.getProductMaxRating();
  }
}
