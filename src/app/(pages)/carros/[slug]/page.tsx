import { getCarros } from "@/app/services/carro";
import Image from "next/image";
import { notFound } from "next/navigation";

const cars = getCarros();

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) return { title: "AutoStore" };
  return {
    title: `${car.title} - AutoStore`,
    description: car.description || "Detalhes do veículo",
  };
}

const CarPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const car = cars.find((c) => c.slug === slug);
  if (!car) return notFound();

  return (
    <div className="min-h-screen items-center justify-center flex flex-col">
      <main className="flex-1 items-center justify-center w-[30%] px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">{car.title}</h1>
          <div className="text-2xl text-emerald-500 font-bold mt-3">
            R$ {car.price.toLocaleString("pt-BR")}
          </div>
          <div className="flex gap-6 text-gray-600 mt-3">
            <span>Ano: {car.year}</span>
            <span>Quilometragem: {car.km.toLocaleString("pt-BR")} km</span>
          </div>
        </div>

        {car.hero_image && (
          <div className="w-full mb-8 rounded-lg overflow-hidden relative h-64 md:h-96">
            <Image
              src={car.hero_image}
              alt={car.hero_image_alt || car.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <article className="prose max-w-none text-gray-800">
          <p>{car.description}</p>

          <h2 className="mt-8">Características</h2>
          <ul className="list-disc ml-6">
            <li>Carro revisado</li>
            <li>Histórico de manutenção disponível</li>
            <li>Garantia de procedência</li>
          </ul>
        </article>
      </main>
    </div>
  );
};

export default CarPage;
