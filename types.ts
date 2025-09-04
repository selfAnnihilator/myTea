
// FIX: Expanded the Category type to include all categories used throughout the application.
// This resolves type errors in components like ArticlesSection.tsx where a wider range of categories is expected for filtering UI and logic.
export type Category = 'Business' | 'Entertainment' | 'Health' | 'Politics' | 'Science' | 'Sports' | 'Technology';

export interface Article {
  id: string; // Use URL as a more reliable unique ID
  title: string;
  imageUrl: string;
  publisher: string;
  sourceUrl: string;
  overview: string;
  category: Category;
}
