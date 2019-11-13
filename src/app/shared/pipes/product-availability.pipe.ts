import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productAvailability'
})
export class ProductAvailabilityPipe implements PipeTransform {
  transform(amount: number, selled: number): number {
    return amount - selled;
  }
}
