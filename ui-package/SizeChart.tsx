import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

interface SizeChartUIProps {
  title?: string;
  description?: string;
  sizeData?: Array<{
    measurement?: string;
    description?: string;
    m?: string;
    l?: string;
    xl?: string;
    xxl?: string;
  }>;
  chartImage?: string;
  chartImageAlt?: string;
  whatsappText?: string;
  whatsappNumber?: string;
  contactText?: string;
  returnPolicy?: string;
  colors?: {
    primary?: string;
    text?: string;
    background?: string;
  };
}

const SizeChartUI: React.FC<SizeChartUIProps> = ({
  title,
  description,
  sizeData = [],
  chartImage,
  chartImageAlt,
  whatsappText,
  whatsappNumber,
  contactText,
  returnPolicy,
  colors = {}
}) => {
  const primaryColor = colors.primary || '#10b981';
  const textColor = colors.text || '#27272a';
  const backgroundColor = colors.background || '#ffffff';

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col justify-start items-center gap-8 lg:gap-16">
        {/* Section Header */}
        <div className="text-center mb-0">
          <h1 
            className="text-zinc-800 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:leading-[64px] text-center"
            style={{ color: textColor }}
          >
            {title || "সাইজ চার্ট"}
          </h1>
          {description && (
            <p className="text-zinc-600 text-lg mt-4 text-center">{description}</p>
          )}
        </div>

        <div className="self-stretch grid lg:grid-cols-3 gap-8 items-center">
          {/* Size Table */}
          <div className="lg:col-span-2 rounded-2xl border border-zinc-200 overflow-hidden bg-white">
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] min-w-[600px]">
                <div className="p-4"></div>
                {['M', 'L', 'XL', 'XXL'].map(size => (
                  <div key={size} className="p-4 flex items-center justify-center border-b border-l border-zinc-200">
                    <span className="font-semibold text-zinc-800 text-lg md:text-xl">{size}</span>
                  </div>
                ))}

                {sizeData.map((row, rowIndex) => (
                  <React.Fragment key={row.measurement}>
                    <div className={`p-4 border-t border-zinc-200 ${rowIndex === 0 ? 'border-t-0' : ''}`}>
                      <h3 className="font-bold text-zinc-800 text-base md:text-lg">{row.measurement}</h3>
                      <p className="text-zinc-600 text-xs md:text-sm mt-1">{row.description}</p>
                    </div>
                    <div className={`p-4 flex items-center justify-center border-t border-l border-zinc-200 ${rowIndex === 0 ? 'border-t-0' : ''}`}>
                      <span className="text-zinc-800 text-lg md:text-xl">{row.m}</span>
                    </div>
                    <div className={`p-4 flex items-center justify-center border-t border-l border-zinc-200 ${rowIndex === 0 ? 'border-t-0' : ''}`}>
                      <span className="text-zinc-800 text-lg md:text-xl">{row.l}</span>
                    </div>
                    <div className={`p-4 flex items-center justify-center border-t border-l border-zinc-200 ${rowIndex === 0 ? 'border-t-0' : ''}`}>
                      <span className="text-zinc-800 text-lg md:text-xl">{row.xl}</span>
                    </div>
                    <div className={`p-4 flex items-center justify-center border-t border-l border-zinc-200 ${rowIndex === 0 ? 'border-t-0' : ''}`}>
                      <span className="text-zinc-800 text-lg md:text-xl">{row.xxl}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Image */}
          <div className="lg:col-span-1 bg-gray-100 rounded-2xl flex items-center justify-center p-8 h-full min-h-[300px]">
            {chartImage ? (
              <img
                src={chartImage}
                alt={chartImageAlt || "Sweatshirt measurement guide"}
                className="max-w-full h-auto object-contain max-h-[400px]"
              />
            ) : (
              <div className="text-zinc-500 text-center">
                <p>Chart Image</p>
                <p className="text-sm">Upload an image to display here</p>
              </div>
            )}
          </div>
        </div>

        {/* Return Policy & Contact */}
        <div 
          className="self-stretch p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8"
          style={{ backgroundColor: primaryColor }}
        >
          <p className="flex-1 text-white text-lg md:text-2xl font-semibold leading-relaxed md:leading-7 text-center md:text-left">
            {returnPolicy || "অবশ্যই 100% কনফার্ম হয়ে অর্ডারটি করবেন। সাইজে প্রবলেম হলে অথবা অন্য কোন সমস্যা হলে রিটার্ন বা এক্সচেঞ্জ করে নিতে পারবেন ৩ দিনের ভেতরে।"}
          </p>
          <div className="flex-shrink-0 text-white text-center md:text-right">
            <div className="flex flex-col md:items-end gap-1">
              <div className="flex items-center justify-center md:justify-end gap-2 text-white/90">
                <span className="text-base md:text-xl font-semibold">{whatsappText || "যেকোন প্রয়োজনে"}</span>
                <BsWhatsapp className="w-5 h-5" />
              </div>
              <div className="text-2xl md:text-3xl font-bold font-mono">{whatsappNumber || "01712508063"}</div>
              <div className="text-2xl md:text-4xl lg:text-5xl font-bold mt-1">{contactText || "যোগাযোগ করুন"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SizeChartUI;
