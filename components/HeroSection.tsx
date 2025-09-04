import React from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import AnimatedSection from './AnimatedSection';

const HeroSection: React.FC = () => {
  const typedTitle = useTypingEffect("Your Daily Brew of News", 100);

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <AnimatedSection className="text-center text-white p-8 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-4 min-h-[6rem] md:min-h-[9rem] font-display">
          {typedTitle}
          <span className="cursor-blink">|</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-gray-200">
          Freshly curated articles and stories, served hot and ready for you. We filter the noise, so you can enjoy the most important updates of the day.
        </p>
      </AnimatedSection>
    </section>
  );
};

export default HeroSection;