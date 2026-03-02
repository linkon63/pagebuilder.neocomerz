import React from "react";
import { LuShoppingBag } from "react-icons/lu";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Testimonials from "./sections/Testimonials";
import FAQ from "./sections/FAQ";
import SizeChart from "./sections/SizeChart";
import OrderForm from "./sections/OrderForm";
import Footer from "./sections/Footer";
import {
  HeroProps,
  FeaturesProps,
  TestimonialItem,
  FAQItem,
  SizeChartProps,
  OrderFormProps,
  FooterProps,
} from "../../ui-package/types";

// Example data for the Punjabi landing page
const heroData: HeroProps = {
  backgroundImage: "./assets/images/hero-bg.jpg",
  logo: {
    src: "./assets/images/logo.svg",
    alt: "NeoComerz Logo",
    width: 180,
    height: 42,
  },
  title: {
    main: "প্রিমিয়াম",
    subtitle: "Quality Indian Punjabi",
    discount: "30% Discount",
  },
  ctaButton: {
    text: "এখনই অর্ডার করুন",
    href: "#order-form",
    icon: <LuShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  colors: {
    primary: "#F36621",
    text: "#222F28",
  },
};

const featuresData: FeaturesProps = {
  title: (
    <>
      কেন এটা <span style={{ color: "#F36621" }}>আলাদা করে</span> নজর কাড়ে
    </>
  ),
  description: (
    <>
      শুধু সুন্দর নয়, আরামদায়কও। আমাদের প্রিমিয়াম কোয়ালিটির Quality Panjabi
      সেট{" "}
      <span className="font-semibold" style={{ color: "#F36621" }}>
        আপনাকে দেবে এক অনন্য অভিজ্ঞতা।
      </span>{" "}
      প্রতিটি স্টিচে রয়েছে আমাদের নিখুঁত কারুকার্য।
    </>
  ),
  features: [
    { text: "Quality runway-inspired design" },
    { text: "Elegant cut & premium fall — ছবি আর বাস্তবে এক" },
    { text: "Daily wear থেকে occasion—দুই জায়গাতেই মানানসই" },
    { text: "বাংলাদেশি আবহাওয়ার জন্য comfortable fabric choice" },
  ],
  images: [
    {
      src: "./assets/images/feature-1.jpg",
      alt: "Model in a yellow traditional dress",
    },
    {
      src: "./assets/images/feature-2.webp",
      alt: "Model in a pink traditional dress",
    },
    {
      src: "./assets/images/feature-3.jpg",
      alt: "Model in a green traditional dress",
    },
    {
      src: "./assets/images/feature-4.jpg",
      alt: "Back view of a model in a green traditional dress",
    },
  ],
  ctaButton: {
    text: "এখনই অর্ডার করুন",
    href: "#order-form",
    icon: <LuShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
  },
  tagline: "এটা শুধু একটা ড্রেস না—এটা এখনকার ফ্যাশন ট্রেন্ডের অংশ।",
  colors: {
    primary: "#F36621",
    text: "#222F28",
    background: "#ffffff",
  },
};

const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Rahim Ahmed",
    rating: 5,
    text: "অসাধারণ কোয়ালিটি! ফ্যাব্রিক খুবই আরামদায়ক এবং ডিজাইন ট্রেন্ডি। অনুষ্ঠানে পরে অনেক প্রশংসা পেয়েছি।",
    image: "./assets/images/review-1.jpeg",
    designation: "Businessman",
  },
  {
    id: "2",
    name: "Karim Khan",
    rating: 5,
    text: "ছবিতে যেমন দেখানো হয়েছে, বাস্তবেও ঠিক তেমন। স্টিচিং এবং ফিনিশিং দারুণ।",
    image: "./assets/images/review-2.jpeg",
    designation: "Teacher",
  },
  {
    id: "3",
    name: "Jamal Uddin",
    rating: 4,
    text: "ভালো পণ্য, মূল্য সাশ্রয়ী। শুধু ডেলিভারিতে একটু সময় লেগেছে।",
    image: "./assets/images/review-3.jpeg",
    designation: "Student",
  },
];

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "পণ্যটির মান কেমন?",
    answer:
      "আমরা শুধুমাত্র প্রিমিয়াম কোয়ালিটির ফ্যাব্রিক ব্যবহার করি যা বাংলাদেশের আবহাওয়ার জন্য উপযুক্ত।",
  },
  {
    id: "2",
    question: "ডেলিভারি কত দিনে হয়?",
    answer:
      "ঢাকার মধ্যে ২-৩ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসে ডেলিভারি দেওয়া হয়।",
  },
  {
    id: "3",
    question: "কিভাবে অর্ডার করব?",
    answer:
      "আপনি আমাদের ওয়েবসাইটে অর্ডার ফর্ম পূরণ করে অথবা ফোনে অর্ডার করতে পারেন।",
  },
];

const sizeChartData: SizeChartProps = {
  title: "Size Chart",
  description: "সঠিক সাইজ নির্বাচনের জন্য আমাদের সাইজ চার্ট অনুসরণ করুন",
  sizeChart: {
    headers: ["Size", "Chest", "Length", "Shoulder"],
    rows: [
      ["S", '38"', '30"', '16"'],
      ["M", '40"', '32"', '17"'],
      ["L", '42"', '34"', '18"'],
      ["XL", '44"', '36"', '19"'],
      ["XXL", '46"', '38"', '20"'],
    ],
  },
};

const orderFormData: OrderFormProps = {
  title: "Place Your Order",
  description: "Fill in your details to complete your order",
  productInfo: {
    name: "Premium Quality Punjabi",
    price: 2500,
    discountPrice: 1750,
  },
};

const footerData: FooterProps = {
  sections: [
    {
      title: "Quick Links",
      links: [
        { title: "Home", href: "#" },
        { title: "Products", href: "#" },
        { title: "About Us", href: "#" },
        { title: "Contact", href: "#" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { title: "Track Order", href: "#" },
        { title: "Returns", href: "#" },
        { title: "Shipping Info", href: "#" },
        { title: "FAQ", href: "#" },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { title: "+880 1234-567890", href: "tel:+8801234567890" },
        { title: "info@neocomerz.com", href: "mailto:info@neocomerz.com" },
        { title: "Dhaka, Bangladesh", href: "#" },
      ],
    },
  ],
  socialLinks: [
    { title: "f", href: "#" },
    { title: "t", href: "#" },
    { title: "i", href: "#" },
  ],
  copyright: "© 2024 NeoComerz. All rights reserved.",
};

// Example usage component
export default function PunjabiLandingPage() {
  return (
    <div>
      <Hero {...heroData} />
      <Features {...featuresData} />
      <Testimonials
        title="What Our Customers Say"
        description="আমাদের গ্রাহকদের মূল্যবান মতামত"
        testimonials={testimonialsData}
      />
      <FAQ
        title="Frequently Asked Questions"
        description="আপনার জিজ্ঞাসার উত্তর"
        faqs={faqData}
      />
      <SizeChart {...sizeChartData} />
      <div id="order-form">
        <OrderForm {...orderFormData} />
      </div>
      <Footer {...footerData} />
    </div>
  );
}
