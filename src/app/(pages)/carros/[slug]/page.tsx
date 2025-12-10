import { getCarrosMatter, convertMarkdownToHtml } from "@/app/services/carro";
import Image from "next/image";
import { notFound } from "next/navigation";

const cars = getCarrosMatter();

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const car = cars.find((c) => c.data.slug === slug);
  if (!car) return { title: "AutoStore" };
  return {
    title: `${car.data.title} - AutoStore`,
    description: car.data.description || "Detalhes do veículo",
  };
}

const CarPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const car = cars.find((c) => c.data.slug === slug);
  if (!car) return notFound();

  // Converter markdown para HTML usando remark
  const contentHtml = await convertMarkdownToHtml(car.content);

  return (
    <div className="min-h-screen items-center justify-center flex flex-col">
      <main className="flex-1 items-center justify-center w-[30%] px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            {car.data.title}
          </h1>
          <div className="text-2xl text-emerald-500 font-bold mt-3">
            R$ {car.data.price.toLocaleString("pt-BR")}
          </div>
          <div className="flex gap-6 text-gray-600 mt-3">
            <span>Ano: {car.data.year}</span>
            <span>Quilometragem: {car.data.km.toLocaleString("pt-BR")} km</span>
          </div>
        </div>

        {car.data.hero_image && (
          <div className="w-full mb-8 rounded-lg overflow-hidden relative h-64 md:h-96">
            <Image
              src={car.data.hero_image}
              alt={car.data.hero_image_alt || car.data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <article
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </main>
    </div>
  );
};

export default CarPage;
