"use client";

import Link from "next/link";
import Image from "next/image";

interface CarCardProps {
  title: string;
  slug: string;
  price: number;
  year: number;
  km: number;
  hero_image: string;
  hero_image_alt: string;
}

const CarCard: React.FC<CarCardProps> = ({
  title,
  slug,
  price,
  year,
  km,
  hero_image,
  hero_image_alt,
}) => {
  return (
    <Link href={`/carros/${slug}`} className="no-underline">
      <div className="border border-gray-300 rounded-lg overflow-hidden transition-transform duration-200 bg-white hover:shadow-lg hover:-translate-y-1 cursor-pointer">
        {hero_image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={hero_image}
              alt={hero_image_alt}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="m-0 mb-2 text-gray-800">{title}</h3>
          <p className="text-xl font-bold text-emerald-500 my-2">
            R$ {price.toLocaleString("pt-BR")}
          </p>
          <div className="flex gap-4 text-gray-600 text-sm">
            <span>{year}</span>
            <span>{km.toLocaleString("pt-BR")} km</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
