import React from "react";
import img1 from "@/ui-package/images/ProductImage1.webp";
import img2 from "@/ui-package/images/ProductImage2.webp";
import img3 from "@/ui-package/images/ProductImage3.webp";
import img4 from "@/ui-package/images/productFeature-1.jpg";
import img5 from "@/ui-package/images/productFeature-2.webp";
import img6 from "@/ui-package/images/productFeature-3.jpg";

export interface GalleryGrid6Props {
  title?: string;
  description?: string;
  images?: { src: string; alt?: string }[];
}

export default function GalleryGrid6({
  title = "Premium Collection",
  description = "A specialized 6-pack grid for your finest products.",
  images = [
    { src: img1.src, alt: "Featured" },
    { src: img2.src, alt: "Product 1" },
    { src: img3.src, alt: "Product 2" },
    { src: img4.src, alt: "Product 3" },
    { src: img5.src, alt: "Product 4" },
    { src: img6.src, alt: "Product 5" },
  ],
}: GalleryGrid6Props) {
  const imagesToDisplay = images.slice(0, 6);
  const count = imagesToDisplay.length;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          count === 1 ? "md:grid-cols-1" :
          count === 2 ? "md:grid-cols-2" :
          "md:grid-cols-3"
        } gap-2 md:gap-3`}>
          {imagesToDisplay.map((image, index) => {
            // Featured logic: First image is 2x2 if we have 4 or more images
            const isFeatured = index === 0 && count >= 4;
            
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 ${
                  isFeatured ? "md:col-span-2 md:row-span-2 h-full" : "h-full"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
