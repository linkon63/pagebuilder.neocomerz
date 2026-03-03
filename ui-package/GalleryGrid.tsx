import img1 from "@/ui-package/images/ProductImage1.webp";
import img2 from "@/ui-package/images/ProductImage2.webp";
import img3 from "@/ui-package/images/ProductImage3.webp";
import img4 from "@/ui-package/images/productFeature-1.jpg";
import img5 from "@/ui-package/images/productFeature-2.webp";

export interface GalleryGridProps {
  title?: string;
  description?: string;
  images?: { src: string; alt?: string }[];
}

export default function GalleryGrid({
  title = "Curated Collection",
  description = "Explore our visually stunning grid of premium products and lifestyle shots.",
  images = [
    { src: img1.src, alt: "Featured" },
    { src: img2.src, alt: "Product 1" },
    { src: img3.src, alt: "Product 2" },
    { src: img4.src, alt: "Product 3" },
    { src: img5.src, alt: "Product 4" },
  ],
}: GalleryGridProps) {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="max-w-3xl mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          images.length === 1 ? "md:grid-cols-1" :
          images.length === 2 ? "md:grid-cols-2" :
          images.length === 3 ? "md:grid-cols-3" :
          "md:grid-cols-4"
        } gap-4 min-h-[200px]`}>
          {images.slice(0, 9).map((image, index) => {
            // Featured logic (2x2) only applies if we have at least 4 images and this is the first one
            const isFeatured = index === 0 && images.length >= 4;
            
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 ${
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
