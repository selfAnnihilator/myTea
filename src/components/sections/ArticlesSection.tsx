
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fetchArticles } from '../../services/newsService';
import type { Article, Category } from '../../types';
import ArticleCard from '../ui/ArticleCard';
import AnimatedSection from '../ui/AnimatedSection';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useOnScreen } from '../../hooks/useOnScreen';
import { NetworkError, ApiError } from '../../utils/errors.ts';

const ARTICLES_PER_LOAD = 6; // Corresponds to two rows of three articles

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_LOAD);

  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    if (isVisible && !hasFetched) {
      const loadArticles = async () => {
        setHasFetched(true);
        setLoading(true);
        setError(null); // Reset error state on new fetch attempt
        try {
          const fetchedArticles = await fetchArticles();
          setArticles(fetchedArticles);
        } catch (err) {
          console.error("Failed to fetch articles:", err);
          
          // Provide user-friendly error messages based on error type
          if (err instanceof NetworkError) {
            setError("Network connection failed. Please check your internet connection and try again.");
          } else if (err instanceof ApiError) {
            if (err.status === 404) {
              setError("The requested resource was not found.");
            } else if (err.status === 500) {
              setError("Our servers are currently experiencing issues. Please try again later.");
            } else {
              setError(`Service error: ${err.message}`);
            }
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unexpected error occurred while fetching articles. Please try again later.");
          }
        } finally {
          setLoading(false);
        }
      };
      loadArticles();
    }
  }, [isVisible, hasFetched]);
  
  useEffect(() => {
    setVisibleCount(ARTICLES_PER_LOAD);
  }, [selectedCategory]);

  const categories = useMemo(() => {
    if (articles.length === 0) return [];
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    // A specific order might be better than alphabetical
    const preferredOrder: Category[] = ['Politics', 'Business', 'Technology', 'Health', 'Science', 'Sports', 'Entertainment'];
    const sortedCategories = uniqueCategories.sort((a, b) => preferredOrder.indexOf(a as Category) - preferredOrder.indexOf(b as Category));
    return ['All', ...sortedCategories];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return articles;
    }
    return articles.filter(article => article.category === selectedCategory);
  }, [articles, selectedCategory]);
  
  const articlesToShow = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  

  return (
    <section ref={sectionRef} id="articles" className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white font-display">Latest Articles</h2>
          <p className="text-lg text-gray-300 mt-4">Discover what&apos;s happening around the world.</p>
        </AnimatedSection>

        {!loading && articles.length > 0 && (
          <AnimatedSection className="flex justify-center items-center flex-wrap gap-3 sm:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as Category | 'All')}
                className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold border-2 border-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </AnimatedSection>
        )}

        {loading && <LoadingSpinner />}

        {!loading && error && (
            <AnimatedSection className="text-center py-16 bg-red-900/20 rounded-lg">
                <p className="text-2xl text-red-300 font-semibold">Could Not Load News</p>
                <p className="text-lg text-red-300/80 mt-2">{error}</p>
            </AnimatedSection>
        )}
        
        {!loading && !error && articlesToShow.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlesToShow.map((article, index) => (
                <AnimatedSection key={article.id} style={{ transitionDelay: `${(index % ARTICLES_PER_LOAD) * 100}ms` }}>
                    <ArticleCard article={article} />
                </AnimatedSection>
              ))}
            </div>

            {filteredArticles.length > visibleCount && (
                <AnimatedSection className="text-center mt-12">
                    <button
                        onClick={() => setVisibleCount(prevCount => prevCount + ARTICLES_PER_LOAD)}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/50 transform hover:scale-105"
                        aria-label="Load more articles"
                    >
                        Load More
                    </button>
                </AnimatedSection>
            )}
          </>
        )}

        {!loading && !error && filteredArticles.length === 0 && articles.length > 0 && (
            <AnimatedSection className="text-center py-16">
                <p className="text-xl text-gray-400">No articles found in this category.</p>
            </AnimatedSection>
        )}
        
        
      </div>
    </section>
  );
};

export default ArticlesSection;
