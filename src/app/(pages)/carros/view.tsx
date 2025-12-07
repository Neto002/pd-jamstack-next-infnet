"use client";

import CarCard from "@/app/components/CarCard";
import { Car } from "@/app/interfaces/Car";
import { useMemo, useState } from "react";

interface CarrosViewProps {
  carros: Car[];
}

const ITEMS_PER_PAGE = 9;

const CarrosView: React.FC<CarrosViewProps> = ({ carros }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    precoMin: "",
    precoMax: "",
    anoMin: "",
    anoMax: "",
    kmMin: "",
    kmMax: "",
  });

  const filteredCars = useMemo(() => {
    return carros.filter((car) => {
      const { precoMin, precoMax, anoMin, anoMax, kmMin, kmMax } = filters;
      if (precoMin && car.price < Number(precoMin)) return false;
      if (precoMax && car.price > Number(precoMax)) return false;
      if (anoMin && car.year < Number(anoMin)) return false;
      if (anoMax && car.year > Number(anoMax)) return false;
      if (kmMin && car.km < Number(kmMin)) return false;
      if (kmMax && car.km > Number(kmMax)) return false;
      return true;
    });
  }, [filters, carros]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCars.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCars = filteredCars.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <header className="bg-gray-100 py-8 mb-8 rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Nossos Carros
          </h1>
        </header>

        <section className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Preço Mínimo
              </label>
              <input
                name="precoMin"
                type="number"
                placeholder="R$"
                value={filters.precoMin}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Preço Máximo
              </label>
              <input
                name="precoMax"
                type="number"
                placeholder="R$"
                value={filters.precoMax}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Ano Mínimo
              </label>
              <input
                name="anoMin"
                type="number"
                placeholder="Ex: 2020"
                value={filters.anoMin}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Ano Máximo
              </label>
              <input
                name="anoMax"
                type="number"
                placeholder="Ex: 2024"
                value={filters.anoMax}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                KM Mínimo
              </label>
              <input
                name="kmMin"
                type="number"
                placeholder="Ex: 0"
                value={filters.kmMin}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                KM Máximo
              </label>
              <input
                name="kmMax"
                type="number"
                placeholder="Ex: 100000"
                value={filters.kmMax}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </form>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentCars.map((car) => (
            <CarCard
              key={car.id}
              title={car.title}
              slug={car.slug}
              price={car.price}
              year={car.year}
              km={car.km}
              hero_image={car.hero_image || ""}
              hero_image_alt={car.hero_image_alt || car.title}
            />
          ))}
        </section>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded border ${
                  p === currentPage
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CarrosView;

export const metadata = {
  title: "Carros - AutoStore",
  description:
    "Confira nossa seleção de carros seminovos e usados com garantia de procedência.",
};
