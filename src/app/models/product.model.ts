import { element } from 'protractor';
import { map } from 'rxjs/operators';

export class Product {
  id?: number;
  categoryId: number;
  cost: number;
  count: number;
  description: string;
  gender: string;
  image: string;
  name: string;
  rating: number;
  soldCount: number;

  constructor(
    categoryId: number = 0,
    cost: number = 0,
    count: number = 0,
    description: string = '',
    gender: string = 'Unisex',
    image: string = '',
    name: string = '',
    rating: number = 0,
    soldCount: number = 0
  ) {
    this.categoryId = categoryId;
    this.cost = cost;
    this.count = count;
    this.description = description;
    this.gender = gender;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.soldCount = soldCount;
  }

  public static getProductMaxRating(): number {
    return 5;
  }

  public static getDefaultQuantityToAdd(): number {
    return 5;
  }

  public static getRatingItemsForSelect(): { id: number; name: number }[] {
    const maxRating = this.getProductMaxRating();
    const ratingItems: { id: number; name: number }[] = [];

    for (let index = 0; index <= maxRating; index++) {
      const el = { id: index, name: index };
      ratingItems.push(el);
    }

    return ratingItems;
  }

  public static getGendersList(): string[] {
    return ['Man', 'Woman', 'Unisex'];
  }
}
