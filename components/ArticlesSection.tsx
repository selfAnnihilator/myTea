import React, { useState, useEffect, useRef } from 'react';
import { fetchArticles } from '../services/newsService';
import type { Article } from '../types';
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

  return (
    <section ref={sectionRef} id="articles" className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white font-display">Latest Articles</h2>
          <p className="text-lg text-gray-300 mt-4">Discover what's happening around the world.</p>
        </AnimatedSection>

        {loading && <LoadingSpinner />}
        
        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <AnimatedSection key={article.id} style={{ transitionDelay: `${index * 150}ms` }}>
                  <ArticleCard article={article} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
