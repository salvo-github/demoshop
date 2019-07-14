import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../category.model';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: [
    './product-edit.component.scss',
    '../../../../assets/scss/mediaquery.scss',
    '../../../../assets/scss/modal.scss',
    '../../../../assets/scss/form/form.scss'
  ]
})
export class ProductEditComponent implements OnInit {
  editForm: FormGroup;
  genders = ['Man', 'Woman', 'Unisex'];
  categories: Category[];
  product: Product;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.product = this.route.snapshot.data.product;

    this.editForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      categoryId: new FormControl(this.product.categoryId, this.toNumber),
      gender: new FormControl(this.product.gender, [Validators.required]),
      description: new FormControl(this.product.description, [
        Validators.required
      ]),
      image: new FormControl(this.product.image, [Validators.required]),
      cost: new FormControl(this.product.cost, [
        Validators.required,
        this.toNumber
      ]),
      rating: new FormControl(this.product.rating, [
        Validators.required,
        this.toNumber
      ])
    });

    this.productsService.fetchCategories().subscribe((categoriesData) => {
      this.categories = categoriesData;
    });
  }

  toNumber(control: FormControl): { [s: string]: boolean } {
    if (typeof control.value !== 'number') {
      control.setValue(+control.value);
      return null;
    }
    return null;
  }

  onSubmit() {
    console.log(this.editForm.value);
    const editedProduct: Product = Object.assign(
      this.product,
      this.editForm.value
    );
    this.productsService.saveProduct(editedProduct).subscribe((resp) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
