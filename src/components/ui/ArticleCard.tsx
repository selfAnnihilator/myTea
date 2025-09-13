
import React, { useState, useEffect } from 'react';
import type { Article } from '../../types';
import { optimizeImageUrl, getPlaceholderImage } from '../../utils/imageOptimizer';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageUrl, setImageUrl] = useState<string>(getPlaceholderImage(600, 400));
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Optimize the image URL
    const optimizedUrl = optimizeImageUrl(article.imageUrl, 600, 400, 75);
    setImageUrl(optimizedUrl);
  }, [article.imageUrl]);

  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={article.title}
          className={`w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? '' : 'blur-sm'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            // Fallback to placeholder if image fails to load
            setImageUrl(getPlaceholderImage(600, 400));
            setImageLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      <div className="p-6 text-white">
        <span className="text-sm font-semibold text-gray-300">{article.publisher}</span>
        <h3 className="text-2xl font-bold mt-2 mb-3 leading-tight group-hover:text-gray-200 font-display h-24 line-clamp-3">
          {article.title}
        </h3>
        <p className="text-gray-200 font-light line-clamp-3 h-20">{article.overview}</p>
      </div>
    </a>
  );
};

export default ArticleCard;