import React, { useState, useEffect, useRef, useMemo } from 'react';
import { fetchArticles } from '../services/newsService';
import type { Article, Category } from '../types';
import ArticleCard from './ArticleCard';
import AnimatedSection from './AnimatedSection';
import LoadingSpinner from './LoadingSpinner';
import { useOnScreen } from '../hooks/useOnScreen';

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  // Start loading as false, as we will trigger it only when visible
  const [loading, setLoading] = useState(false);
  // State to ensure we only fetch data once
  const [hasFetched, setHasFetched] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Ref for the section to track its visibility
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    // Fetch articles only when the section becomes visible and hasn't been fetched yet
    if (isVisible && !hasFetched) {
      const loadArticles = async () => {
        setHasFetched(true);
        setLoading(true);
        try {
          const fetchedArticles = await fetchArticles();
          setArticles(fetchedArticles);
        } catch (error) {
          console.error("Failed to fetch articles:", error);
          // Optionally set an error state here to display a message
        } finally {
          setLoading(false);
        }
      };
      loadArticles();
    }
  }, [isVisible, hasFetched]);

  // Derive categories from articles for the filter buttons
  const categories = useMemo(() => {
    if (articles.length === 0) return [];
    const uniqueCategories = [...new Set(articles.map(article => article.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [articles]);

  // Filter articles based on the selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') {
      return articles;
    }
    return articles.filter(article => article.category === selectedCategory);
  }, [articles, selectedCategory]);


  return (
    <section ref={sectionRef} id="articles" className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white font-display">Latest Articles</h2>
          <p className="text-lg text-gray-300 mt-4">Discover what's happening around the world.</p>
        </AnimatedSection>

        {/* Category Filters */}
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
        
        {!loading && filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <AnimatedSection key={article.id} style={{ transitionDelay: `${index * 150}ms` }}>
                  <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && articles.length > 0 && (
            <AnimatedSection className="text-center py-16">
                <p className="text-xl text-gray-400">No articles found in this category.</p>
            </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;