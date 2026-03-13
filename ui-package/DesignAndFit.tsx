import React from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import SectionHeader from './SectionHeader';
import CheckListItem from './CheckListItem';
import { PrimaryButton } from './Button';
import Helpline from './Helpline';

const imageCards = [
  {
    bgImage: "url('/ui-package/images/feature-1/feature-1.webp')",
    title: 'ফিল:',
    description: 'সফট, স্কিন-ফ্রেন্ডলি, আরামদায়ক',
  },
  {
    bgImage: "url('/ui-package/images/feature-1/feature-2.webp')",
    title: 'থিকনেস:',
    description: 'রাজকীয় কারুকাজে অভিজাত্যের ছোঁয়া',
  },
  {
    bgImage: "url('/ui-package/images/feature-1/feature-3.webp')",
    title: 'ফ্রি অফার:',
    description: 'প্রিমিয়াম কোয়ালিটির পায়জামা সম্পূর্ণ ফ্রি!',
  },
];

const detailCards = [
  {
    title: 'Design & Cut',
    items: [
      'Modern Quality silhouette',
      'Clean finishing & elegant tailoring',
      'এমন ডিজাইন যা আলাদা করে নজর কাড়ে',
    ],
  },
  {
    title: 'Fit & Styling',
    items: [
      'Comfortable fit – ঢিলাও না, আঁটসাঁটও না',
      'Casual, festive বা semi-formal—সব জায়গায় মানানসই',
      'Dupatta ও dress balance perfectly matched',
    ],
  },
  {
    title: 'Color & Variations',
    items: [
      'Trend-based colour selection',
      'Limited colour runs (স্টক শেষ হলে আর আসবে না)',
    ],
  },
];

interface DesignAndFitUIProps {
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
    items?: Array<{
      text?: string;
    }>;
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

export default function DesignAndFit({
  title,
  subtitle,
  imageCards = [],
  detailCards = [],
  ctaButton = {
    text: "এখনই অর্ডার করুন",
    href: "#order-form"
  },
  colors = {
    primary: '#F36621',
    text: '#27272a',
    background: '#f3f4f6'
  }
}: DesignAndFitUIProps) {
  return (
    <main>
      <section className="bg-gray-100 pt-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <SectionHeader
            title={<><span className='text-zinc-800'>ইন্ডিয়ান এমব্রয়ডারি,</span><span className="text-zinc-800">পাঞ্জাবি সাশ্রয় দামে </span> <span className="block" style={{ color: '#F36621' }}>- আজকের সেরা ডিল</span></>}
          />
          <div className="grid md:grid-cols-3 gap-4">
            {imageCards.map((card, index) => (
              <div
                key={index}
                className="h-[680px] rounded-2xl bg-cover bg-center relative p-6 flex flex-col justify-end overflow-hidden group"
                style={{ backgroundImage: card.image ? `url(${card.image})` : undefined }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105"
                  style={{ backgroundImage: card.image ? `url(${card.image})` : undefined }}
                />
                <div className="w-60 rounded-2xl p-6 z-10 absolute left-0 bottom-0" style={{ backgroundColor: '#F36621' }}>
                  <div className="absolute -top-2 -right-2">
                    <BsCheckCircleFill className="w-7 h-7 text-green-500 bg-white rounded-full border-2 border-white" />
                  </div>
                  <h3 className="text-white text-2xl font-['Li_Ador_Noirrit'] font-semibold leading-10">{card.title}</h3>
                  <p className="text-white text-xl font-['Li_Ador_Noirrit'] font-semibold leading-7">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-4">
            {detailCards.map((card, index) => (
              <div key={index} className="rounded-2xl p-6" style={{ backgroundColor: 'rgba(243, 102, 33, 0.1)' }}>
                <h3 className="text-zinc-800 text-3xl font-semibold leading-8 mb-3">{card.title}</h3>
                <ul className="space-y-2">
                  {card.items?.map((item, itemIndex) => (
                    <CheckListItem key={itemIndex}>{item.text}</CheckListItem>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center items-start flex-wrap gap-4">
            <PrimaryButton href="#order-form">এখনই অর্ডার করুন</PrimaryButton>
            <Helpline />
          </div>
        </div>
      </section>
    </main>
  );
}
