import img1 from "@/ui-package/images/productFeature-3.jpg";
import img2 from "@/ui-package/images/feature-4.jpg";
import img3 from "@/ui-package/images/ProductImage1.webp";
import img4 from "@/ui-package/images/ProductImage2.webp";

export interface GalleryColProps {
  title?: string;
  description?: string;
  images?: { src: string; alt?: string }[];
}

export default function GalleryCol({
  title = "Our Product Gallery",
  description = "Check out our latest collection and high-quality product images.",
  images = [
    { src: img1.src, alt: "Product 1" },
    { src: img2.src, alt: "Product 2" },
    { src: img3.src, alt: "Product 3" },
    { src: img4.src, alt: "Product 4" },
  ],
}: GalleryColProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${
          images.length === 1 ? "lg:grid-cols-1" : 
          images.length === 2 ? "lg:grid-cols-2" : 
          images.length === 3 ? "lg:grid-cols-3" : 
          "lg:grid-cols-4"
        } gap-6`}>
          {images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative group aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
