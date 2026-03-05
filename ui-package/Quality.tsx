import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

interface QualityUIProps {
  title?: string;
  subtitle?: string;
  imageCards?: Array<{
    image?: string;
    title?: string;
    description?: string;
    alt?: string;
  }>;
  detailCards?: Array<{
    title?: string;
    items?: Array<{ text?: string }>;
  }>;
  ctaButton?: {
    text?: string;
    href?: string;
  };
  colors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
}

const QualityUI: React.FC<QualityUIProps> = ({
  title,
  subtitle,
  imageCards = [],
  detailCards = [],
  ctaButton,
  colors = {}
}) => {
  const primaryColor = colors.primary || '#F36621';
  const textColor = colors.text || '#27272a';
  const backgroundColor = colors.background || '#f3f4f6';

  const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start gap-2">
      <BsCheckCircleFill className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
      <span className="text-gray-700 leading-relaxed">{children}</span>
    </li>
  );

  const PrimaryButton: React.FC<{ href?: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
      href={href || '#'}
      className="inline-block px-8 py-4 text-white font-bold rounded-lg transition-all hover:opacity-90 shadow-lg"
      style={{ backgroundColor: primaryColor }}
    >
      {children}
    </a>
  );

  return (
    <main>
      {/* Image Cards Section */}
      <section className="pt-24" style={{ backgroundColor: '#f3f4f6' }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: textColor }}>
              {title && <span>{title}</span>}
              {subtitle && (
                <span className="block" style={{ color: primaryColor }}>
                  {subtitle}
                </span>
              )}
            </h1>
          </div>

          {/* Image Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {imageCards.map((card, index) => (
              <div
                key={index}
                className="h-[680px] rounded-2xl bg-cover bg-center relative p-6 flex flex-col justify-end overflow-hidden group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: card.image ? `url(${card.image})` : undefined }}
                />
                <div 
                  className="w-60 rounded-2xl p-6 z-10 absolute left-0 bottom-0" 
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="absolute -top-2 -right-2">
                    <BsCheckCircleFill className="w-7 h-7 text-green-500 bg-white rounded-full border-2 border-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold leading-10">{card.title}</h3>
                  <p className="text-white text-xl font-semibold leading-7">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Cards Section */}
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-4">
            {detailCards.map((card, index) => (
              <div 
                key={index} 
                className="rounded-2xl p-6" 
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <h3 className="text-3xl font-semibold leading-8 mb-3" style={{ color: textColor }}>
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.items?.map((item, itemIndex) => (
                    <CheckListItem key={itemIndex}>{item.text}</CheckListItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 flex justify-center items-start flex-wrap gap-4">
            {ctaButton && (
              <PrimaryButton href={ctaButton.href}>
                {ctaButton.text}
              </PrimaryButton>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default QualityUI;
