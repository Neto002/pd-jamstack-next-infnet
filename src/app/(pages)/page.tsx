import Link from "next/link";
import CarCard from "../components/CarCard";
import { GraphQLClient } from "graphql-request";
import { Car } from "../interfaces/Car";

// Revalidar a página a cada 3600 segundos (1 hora)
// Durante o build, usa dados vazios. Após deploy, revalida em background
export const revalidate = 30;

const getGraphQLUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/cars`;
  }
  return "http://localhost:3000/api/cars";
};

export const client = new GraphQLClient(getGraphQLUrl(), {
  headers: process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    ? {
        "x-vercel-protection-bypass":
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      }
    : {},
});

export default async function Home() {
  const query = /* GraphQL */ `
    query {
      cars {
        title
        slug
        price
        year
        km
        hero_image
        hero_image_alt
      }
    }
  `;

  let sampleCars: Car[] = [];

  try {
    const data = await client.request<{ cars: Car[] }>(query);
    sampleCars = data.cars.slice(0, 3);
  } catch (error) {
    console.error("Erro ao buscar carros:", error);
    // Usar dados vazios durante o build, conteúdo não será renderizado
    sampleCars = [];
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative text-white">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/hero-bg.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 py-24">
            <div className="max-w-5xl mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Encontre o Carro dos Seus Sonhos
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-sm">
                Os melhores carros seminovos e usados com garantia de
                procedência
              </p>
              <Link
                href="/contato"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded font-semibold"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </section>

        {/* Featured vehicles */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl text-center text-gray-800 mb-12">
              Veículos em Destaque
            </h2>

            {sampleCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sampleCars.map((car) => (
                  <CarCard
                    key={car.slug}
                    title={car.title}
                    slug={car.slug}
                    price={car.price}
                    year={car.year}
                    km={car.km}
                    hero_image={car.hero_image || ""}
                    hero_image_alt={car.hero_image_alt || car.title}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Carregando veículos em destaque...
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
