import { FoodRatings } from './FoodRatings';

describe('FoodRatings', () => {
  let foodRatings: FoodRatings;

  beforeEach(() => {
    foodRatings = new FoodRatings(
      ['kimchi', 'miso', 'sushi', 'moussaka', 'ramen', 'bulgogi'],
      ['korean', 'japanese', 'japanese', 'greek', 'japanese', 'korean'],
      [9, 12, 8, 15, 14, 7]
    );
  });

  it('should return highest rated food for each cuisine on initialization', () => {
    expect(foodRatings.highestRated('korean')).toBe('kimchi'); // highest korean: kimchi(9)
    expect(foodRatings.highestRated('japanese')).toBe('ramen'); // highest japanese: ramen(14)
    expect(foodRatings.highestRated('greek')).toBe('moussaka'); // highest greek: moussaka(15)
  });

  it('should update rating and return new highest rated food', () => {
    foodRatings.changeRating('sushi', 16);
    expect(foodRatings.highestRated('japanese')).toBe('sushi'); // sushi(16) > ramen(14)
  });

  it('should handle ties using lexicographical order', () => {
    foodRatings.changeRating('sushi', 16);
    foodRatings.changeRating('ramen', 16);
    // tie between ramen(16) & sushi(16), ramen < sushi lexicographically
    expect(foodRatings.highestRated('japanese')).toBe('ramen');
  });

  it('should handle multiple rating changes correctly', () => {
    foodRatings.changeRating('kimchi', 5);
    expect(foodRatings.highestRated('korean')).toBe('bulgogi'); // bulgogi(7) > kimchi(5)
    foodRatings.changeRating('bulgogi', 10);
    expect(foodRatings.highestRated('korean')).toBe('bulgogi'); // bulgogi(10) > kimchi(5)
  });
});
