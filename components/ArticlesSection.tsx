import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/newsService';
import type { Article } from '../types';
import ArticleCard from './ArticleCard';
import AnimatedSection from './AnimatedSection';

const ArticlesSection: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  return (
    <section id="articles" className="w-full min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white">Latest Articles</h2>
          <p className="text-lg text-gray-300 mt-4">Discover what's happening around the world.</p>
        </AnimatedSection>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <p className="text-2xl font-semibold text-white/80 animate-pulse">Brewing the freshest articles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <AnimatedSection key={article.id} className={`transition-delay-${index * 100}`}>
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