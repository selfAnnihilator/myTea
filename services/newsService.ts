
import type { Article } from '../types';

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'The Future of Renewable Energy: A Deep Dive',
    imageUrl: 'https://picsum.photos/seed/tech1/600/400',
    publisher: 'Eco Watch',
    sourceUrl: '#',
    overview: 'Exploring the breakthroughs in solar and wind power that are set to revolutionize the energy sector in the coming decade.'
  },
  {
    id: 2,
    title: 'AI in Healthcare: The Next Frontier',
    imageUrl: 'https://picsum.photos/seed/health2/600/400',
    publisher: 'MediTech Today',
    sourceUrl: '#',
    overview: 'How artificial intelligence is transforming diagnostics, treatment plans, and patient care across the globe.'
  },
  {
    id: 3,
    title: 'Global Markets React to New Economic Policies',
    imageUrl: 'https://picsum.photos/seed/finance3/600/400',
    publisher: 'Finance Weekly',
    sourceUrl: '#',
    overview: 'An in-depth analysis of the recent economic shifts and their ripple effects on stock markets worldwide.'
  },
  {
    id: 4,
    title: 'The Art of Minimalist Living: Less is More',
    imageUrl: 'https://picsum.photos/seed/lifestyle4/600/400',
    publisher: 'Simple Life Magazine',
    sourceUrl: '#',
    overview: 'Discover the principles of minimalism and how decluttering your life can lead to greater happiness and focus.'
  },
  {
    id: 5,
    title: 'Exploring the Mysteries of the Deep Ocean',
    imageUrl: 'https://picsum.photos/seed/science5/600/400',
    publisher: 'Oceanic Geographic',
    sourceUrl: '#',
    overview: 'New discoveries from the Mariana Trench shed light on undiscovered species and the secrets of our planet\'s oceans.'
  },
  {
    id: 6,
    title: 'Culinary Adventures: A Taste of Southeast Asia',
    imageUrl: 'https://picsum.photos/seed/food6/600/400',
    publisher: 'World Gastronomy',
    sourceUrl: '#',
    overview: 'Embark on a flavorful journey through the vibrant street food scenes of Thailand, Vietnam, and Malaysia.'
  }
];

export const fetchArticles = (): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockArticles);
    }, 1500); // Simulate network delay
  });
};
