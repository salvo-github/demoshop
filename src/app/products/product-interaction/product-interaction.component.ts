import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducer';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/product.model';
import { ProductInteractionType } from '../../shared/models/product-interaction-type.model';

@Component({
  selector: 'app-product-interaction',
  templateUrl: './product-interaction.component.html',
  styleUrls: ['./product-interaction.component.scss']
})
export class ProductInteractionComponent implements OnDestroy {
  @Output() private clearProductInteractionType = new EventEmitter<void>();
  @Output() protected closeModal = new EventEmitter<void>();

  @Input() protected product: Product;
  @Input() public productInteractionType: null | number;
  public productInteractionTypeModel = ProductInteractionType;

  public constructor(
    protected productsService: ProductsService,
    protected router: Router,
    protected store: Store<AppState>
  ) {}

  public ngOnDestroy() {
    if (
      Object.getPrototypeOf(this).constructor.name ===
      'ProductInteractionComponent'
    ) {
      this.onCloseModal();
    } else {
      this.closeModalHandler();
    }
  }

  protected onCancel(): void {
    this.closeModalHandler();
  }

  protected closeModalHandler(): void {
    this.closeModal.emit();
  }

  private onCloseModal(): void {
    this.clearProductInteractionType.emit();
  }
}
