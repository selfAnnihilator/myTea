
export type Category = 'Technology' | 'Health' | 'Finance' | 'Lifestyle' | 'Science' | 'Food';

export interface Article {
  id: number;
  title: string;
  imageUrl: string;
  publisher: string;
  sourceUrl: string;
  overview: string;
  category: Category;
}